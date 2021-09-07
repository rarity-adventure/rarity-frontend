import { createAction } from '@reduxjs/toolkit'

export interface Summoner {
    id: string
    _class: string
    _level: string
}

export const updateUserChars = createAction<Summoner[]>('user/updateUserChars')
