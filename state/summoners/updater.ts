import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect } from 'react'
import useRarityLibrary from '../../hooks/useRarityLibrary'
import { setLoading, updateSummoners } from './actions'
import { useGraphSummonerIDs } from '../../services/graph/hooks'
import { chunkArrayByNumber } from '../../functions/chunkArray'

export default function Updater(): null {
    const { library, chainId, account } = useActiveWeb3React()

    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const ids = useGraphSummonerIDs(account)

    const { summoners_full } = useRarityLibrary()

    const fetch_summoners_data = useCallback(
        async (ids: number[]) => {
            const chunks = chunkArrayByNumber(ids, 70)
            let fetchers = []
            for (let chunk of chunks) {
                fetchers.push(summoners_full(chunk))
            }
            const fetcherChunks = chunkArrayByNumber(fetchers, 10)
            let full_data = []
            for (let fChunk of fetcherChunks) {
                const chunk_response = await Promise.all(fChunk)
                full_data = full_data.concat(...chunk_response)
            }
            const summoners_full_data = [].concat(...full_data)
            dispatch(updateSummoners(summoners_full_data))
            dispatch(setLoading(false))
        },
        [summoners_full]
    )

    useEffect(() => {
        if (!ids || !library || !chainId || !account || !windowVisible) return
        fetch_summoners_data(ids)
    }, [ids, windowVisible, fetch_summoners_data, library, chainId, account])
    return null
}
