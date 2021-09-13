import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { useCallback } from 'react'
import { updateSelectedSummoner } from './actions'

export function useUserSummoners(): { id: string }[] {
    return useSelector((state: AppState) => state.user.summoners)
}

export function useUserSelectedSummoner(): string {
    return useSelector((state: AppState) => state.user.selected)
}

export function useUserSelectSummoner(): (summoner: string) => void {
    const dispatch = useDispatch<AppDispatch>()
    return useCallback((summoner) => dispatch(updateSelectedSummoner(summoner)), [dispatch])
}
