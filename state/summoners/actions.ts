import { createAction } from '@reduxjs/toolkit'
import { SummonerFullData } from '../../hooks/useRarityLibrary'

export const updateSummoners = createAction<SummonerFullData[]>('summoners/updateSummoners')
export const setLoading = createAction<boolean>('summoners/setLoading')
