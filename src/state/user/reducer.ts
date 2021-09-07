import { createReducer } from '@reduxjs/toolkit'
import { Summoner, updateUserChars } from './actions'

export interface UserState {
    readonly summoners: Summoner[]
}

const initialState: UserState = {
    summoners: [],
}

export default createReducer(initialState, (builder) =>
    builder.addCase(updateUserChars, (state, action) => {
        state.summoners = action.payload
    })
)
