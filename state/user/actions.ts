import { createAction } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'

export const updateUserChars = createAction<{ id: string }[]>('user/updateUserChars')
