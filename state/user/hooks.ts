import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { useCallback } from 'react'
import { updateSelectedSummoner } from './actions'
import { SummonerFullData } from '../summoners/hooks'

export function useUserSummoners(): { id: string }[] {
    return useSelector((state: AppState) => state.user.summoners)
}

export function useUserSelectedSummoner(): SummonerFullData | undefined {
    return useSelector((state: AppState) => state.user.selected)
}

export function useUserSelectSummoner(): (summoner: SummonerFullData | undefined) => void {
    const dispatch = useDispatch<AppDispatch>()
    return useCallback((summoner) => dispatch(updateSelectedSummoner(summoner)), [dispatch])
}

export function useLoaded(): boolean {
    return useSelector((state: AppState) => state.user.loaded)
}