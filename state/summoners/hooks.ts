import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { useMemo } from 'react'
import { Interface } from '@ethersproject/abi'

export function useSummoners(): SummonerFullData[] {
    return useSelector((state: AppState) => state.summoners.data)
}

export function useSummonersLoading(): boolean {
    return useSelector((state: AppState) => state.summoners.loading)
}
