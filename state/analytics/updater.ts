import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useEffect } from 'react'
import { updateAnalytics } from './actions'
import { useGraphAnalytics } from '../../services/graph/hooks'

export default function Updater(): null {
    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const data = useGraphAnalytics({ refreshInterval: 10000 })

    useEffect(() => {
        if (!windowVisible || !data) return
        dispatch(updateAnalytics(data))
    }, [data, windowVisible])

    return null
}
