import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { SummonerFullData } from '../../hooks/useRarityLibrary'

export function useSummoners(): SummonerFullData[] {
    return useSelector((state: AppState) => {
        return state.summoners.data
    })
}
