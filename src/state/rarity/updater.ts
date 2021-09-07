import { useDispatch } from 'react-redux'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useQuery } from '@apollo/client'
import { METADATA } from '../../apollo'
import { useCallback, useEffect } from 'react'
import { updateMetadata } from './actions'

export default function Updater(): null {
    const dispatch = useDispatch()

    const windowVisible = useIsWindowVisible()

    const { data } = useQuery(METADATA)

    const fetchData = useCallback(() => {
        if (!data) return
        dispatch(updateMetadata(data.metaDatas[0]))
    }, [dispatch, data])

    useEffect(() => {
        fetchData()
    }, [windowVisible, fetchData])

    return null
}
