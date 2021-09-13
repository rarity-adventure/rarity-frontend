import { useSelector } from 'react-redux'
import { AppState } from '../index'

export function useUserSummoners(): { id: string }[] {
    return useSelector((state: AppState) => state.user.summoners)
}
