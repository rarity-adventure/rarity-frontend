import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { ItemData } from '../../hooks/useRarityLibrary'

export function useItems(): ItemData[] {
    return useSelector((state: AppState) => state.items.data)
}

export function useItemsLoading(): ItemData[] {
    return useSelector((state: AppState) => state.items.loading)
}
