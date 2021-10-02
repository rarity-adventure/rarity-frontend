import { useSelector } from 'react-redux'
import { AppState } from '../index'

export function useStats(): { globals: any[]; classes: any[]; levels: any[] } {
    return useSelector((state: AppState) => state.stats.data)
}
