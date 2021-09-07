import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { Summoner } from './actions'

export function useUserSummoners(): Summoner[] {
    return useSelector((state: AppState) => state.user.summoners)
}
