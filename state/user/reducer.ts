import { createReducer } from '@reduxjs/toolkit'
import { updateUserChars } from './actions'
import { BigNumber } from 'ethers'

export interface UserState {
    readonly summoners: { id: string }[]
}

const initialState: UserState = {
    summoners: [],
}

export default createReducer(initialState, (builder) =>
    builder.addCase(updateUserChars, (state, action) => {
        state.summoners = action.payload
    })
)
