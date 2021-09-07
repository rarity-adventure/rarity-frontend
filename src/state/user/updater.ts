import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useQuery } from '@apollo/client'
import { SUMMONERS } from '../../apollo'
import { useCallback, useEffect } from 'react'
import { updateUserChars } from './actions'

export default function Updater(): null {
    const { library, chainId, account } = useActiveWeb3React()

    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const { data } = useQuery(SUMMONERS, { variables: { owner: account } })

    const fetchSummoners = useCallback(() => {
        if (!data) return
        dispatch(updateUserChars(data.summoners))
    }, [dispatch, data])

    useEffect(() => {
        if (!library || !chainId || !windowVisible || !account) return
        fetchSummoners()
    }, [chainId, library, windowVisible, account, fetchSummoners])

    return null
}
