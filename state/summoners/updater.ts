import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect } from 'react'
import { chunkArrayByNumber } from '../../functions/array'
import useRarityLibrary from '../../hooks/useRarityLibrary'
import { setLoading, updateSummoners } from './actions'
import { useGraphSummonerIDs } from '../../services/graph/hooks'

export default function Updater(): null {
    const { library, chainId, account } = useActiveWeb3React()

    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const ids = useGraphSummonerIDs(account)

    const { summoners_full } = useRarityLibrary()

    const fetch_summoners_data = useCallback(
        async (ids: number[]) => {
            const chunks = chunkArrayByNumber(ids, 80)
            let fetchers = []
            for (let chunk of chunks) {
                fetchers.push(summoners_full(chunk))
            }
            const data = await Promise.all(fetchers)
            const summoners_full_data = [].concat(...data)
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
