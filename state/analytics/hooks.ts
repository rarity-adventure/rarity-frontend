import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { SummonerFullData } from '../../hooks/useRarityLibrary'

export function useAnalytics(): { globals: any[]; classes: any[]; levels: any[] } {
    return useSelector((state: AppState) => state.analytics.data)
}
