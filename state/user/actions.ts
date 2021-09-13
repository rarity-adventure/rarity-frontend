import { createAction } from '@reduxjs/toolkit'

export const updateUserSummoners = createAction<{ id: string }[]>('user/updateUserSummoners')
export const updateSelectedSummoner = createAction<string>('user/updateSelectedSummoner')
