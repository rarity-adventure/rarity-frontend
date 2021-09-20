import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { Item } from '../../hooks/useRarityLibrary'

export function useItems(): Item[] {
    return useSelector((state: AppState) => state.items.data)
}
