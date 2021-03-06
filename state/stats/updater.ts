import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useEffect } from 'react'
import { useGraphStats } from '../../services/graph/hooks'
import { updateStats } from './actions'

export default function Updater(): null {
    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const data = useGraphStats({ refreshInterval: 10_000 })

    useEffect(() => {
        if (!data || !windowVisible) return
        dispatch(updateStats(data))
    }, [data, windowVisible])

    return null
}
