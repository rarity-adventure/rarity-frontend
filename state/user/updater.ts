import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useQuery } from '@apollo/client'
import { SUMMONERS } from '../../apollo'
import { useCallback, useEffect } from 'react'
import { updateUserSummoners } from './actions'

export default function Updater(): null {
    const { library, chainId, account } = useActiveWeb3React()

    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const { data, loading, error } = useQuery(SUMMONERS, { variables: { owner: account.toString().toLowerCase() } })

    const fetchSummoners = useCallback(() => {
        dispatch(updateUserSummoners(data.summoners))
    }, [dispatch, data])

    useEffect(() => {
        if (!library || !chainId || !windowVisible || !account || loading || error) return
        fetchSummoners()
    }, [chainId, library, windowVisible, account, fetchSummoners, loading])

    return null
}
