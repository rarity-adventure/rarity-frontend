import { createAction } from '@reduxjs/toolkit'
import { SummonerFullData } from '../summoners/hooks'

export const updateUserSummoners = createAction<{ id: string }[]>('user/updateUserSummoners')
export const updateSelectedSummoner = createAction<SummonerFullData | undefined>('user/updateSelectedSummoner')
export const setLoaded = createAction<boolean>('user/setLoaded')
