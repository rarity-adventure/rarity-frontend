import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect } from 'react'
import { chunkArrayByNumber } from '../../functions/array'
import useRarityLibrary from '../../hooks/useRarityLibrary'
import { updateSummoners } from './actions'
import useSWR from 'swr'
import { graph } from '../../constants'
import { getSummoners } from '../../constants/queries'

export default function Updater(): null {
    const { library, chainId, account } = useActiveWeb3React()

    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const { data, isValidating } = useSWR(!library || !chainId || !account ? null : 'summoners', async () => {
        const ids = await graph(getSummoners, { owner: account.toLowerCase() })
        return ids.summoners.map((s) => {
            return parseInt(s.id)
        })
    })

    console.log(data, isValidating)
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
        if (!data || !library || !chainId || !account || !windowVisible) return
        fetch_summoners_data(data)
    }, [data, windowVisible, fetch_summoners_data, library, chainId, account])
    return null
}
