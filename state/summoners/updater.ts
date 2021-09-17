import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useQuery } from '@apollo/client'
import { SUMMONERS } from '../../apollo'
import { useCallback, useEffect, useState } from 'react'
import { chunkArrayByNumber } from '../../functions/array'
import useRarityLibrary from '../../hooks/useRarityLibrary'
import { updateSummoners } from './actions'
import * as local from './local_summoners.json'

export default function Updater(): null {
    const dispatch = useDispatch()
    dispatch(updateSummoners(Object.values(local).filter((s) => s.id)))
    /*const { library, chainId, account } = useActiveWeb3React()


    const windowVisible = useIsWindowVisible()

    const { data, loading, error } = useQuery(SUMMONERS, {
        variables: { owner: account ? account.toString().toLowerCase() : '' },
    })

    const [summoners, setSummoners] = useState([])

    useEffect(() => {
        if (!library || !chainId || !account || loading || error || !windowVisible) return
        const summoners = data.summoners.map((s) => {
            return s.id
        })
        setSummoners(summoners)
    }, [library, chainId, account, loading, error, windowVisible])

    const { summoners_full } = useRarityLibrary()

    const fetch_summoners_data = useCallback(async () => {
        // If the user has lest than 50 summoners fetch the data and return
        if (summoners.length <= 50) {
            const full_data = await summoners_full(summoners)

            return
        } else {
            const chunks = chunkArrayByNumber(summoners, 50)
            let full_data = []

            for (let chunk of chunks) {
                const chunk_data = await summoners_full(chunk)
                full_data = full_data.concat(chunk_data)
            }

            dispatch(updateSummoners(full_data))
            console.log(full_data)
            return
        }
    }, [summoners_full, summoners])

    useEffect(() => {
        if (!library || !chainId || !account || !windowVisible) return
        fetch_summoners_data()
    }, [summoners, windowVisible, fetch_summoners_data, library, chainId, account])
*/
    return null
}
