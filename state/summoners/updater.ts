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
            // If the user has lest than 50 summoners fetch the data and return
            if (ids.length <= 50) {
                const full_data = await summoners_full(ids)
                dispatch(updateSummoners(full_data))
                return
            } else {
                const chunks = chunkArrayByNumber(ids, 50)
                let full_data = []

                for (let chunk of chunks) {
                    const chunk_data = await summoners_full(chunk)
                    full_data = full_data.concat(chunk_data)
                }

                dispatch(updateSummoners(full_data))
                return
            }
        },
        [summoners_full]
    )

    useEffect(() => {
        if (!ids || !library || !chainId || !account || !windowVisible) return
        dispatch(setLoading(true))
        fetch_summoners_data(ids).then(() => dispatch(setLoading(false)))
    }, [ids, windowVisible, fetch_summoners_data, library, chainId, account])
    return null
}
