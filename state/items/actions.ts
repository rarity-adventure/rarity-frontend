import { createAction } from '@reduxjs/toolkit'
import { ItemData } from '../../hooks/useRarityLibrary'

export const updateItems = createAction<ItemData[]>('items/updateItems')
export const setLoading = createAction<boolean>('items/setLoading')
