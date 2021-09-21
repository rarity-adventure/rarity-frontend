import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect } from 'react'
import useRarityLibrary from '../../hooks/useRarityLibrary'
import { setLoading, updateItems } from './actions'

export default function Updater(): null {
    const { library, chainId, account } = useActiveWeb3React()

    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const { items } = useRarityLibrary()

    const fetch_items = useCallback(async () => {
        dispatch(setLoading(true))
        const i = await items(account)
        dispatch(updateItems(i))
        dispatch(setLoading(false))
    }, [items])

    useEffect(() => {
        if (!library || !chainId || !account || !windowVisible) return
        fetch_items()
    }, [library, chainId, account, windowVisible, fetch_items])

    return null
}
