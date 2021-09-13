import { createReducer } from '@reduxjs/toolkit'
import { updateSelectedSummoner, updateUserSummoners } from './actions'

export interface UserState {
    readonly summoners: { id: string }[]
    readonly selected: string
}

const initialState: UserState = {
    summoners: [],
    selected: '0',
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateUserSummoners, (state, action) => {
            state.summoners = action.payload
        })
        .addCase(updateSelectedSummoner, (state, action) => {
            state.selected = action.payload
        })
)
