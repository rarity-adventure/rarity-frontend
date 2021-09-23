import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect } from 'react'
import { chunkArrayByNumber } from '../../functions/array'
import useRarityLibrary from '../../hooks/useRarityLibrary'
import { updateSummoners } from './actions'
import { useSummonerIDs } from '../../services/graph'

export default function Updater(): null {
    const { library, chainId, account } = useActiveWeb3React()

    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const ids = useSummonerIDs()

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
        fetch_summoners_data(ids)
    }, [ids, windowVisible, fetch_summoners_data, library, chainId, account])
    return null
}
