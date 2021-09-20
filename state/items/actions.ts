import { createAction } from '@reduxjs/toolkit'
import { Item, SummonerFullData } from '../../hooks/useRarityLibrary'

export const updateItems = createAction<Item[]>('items/updateItems')
