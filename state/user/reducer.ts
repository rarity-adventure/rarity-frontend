import { createReducer } from '@reduxjs/toolkit'
import { setLoaded, updateSelectedSummoner, updateUserSummoners } from './actions'

export interface UserState {
    readonly summoners: { id: string }[]
    readonly selected: string | undefined
    readonly loaded: boolean
}

const initialState: UserState = {
    summoners: [],
    selected: undefined,
    loaded: false,
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateUserSummoners, (state, action) => {
            state.summoners = action.payload
        })
        .addCase(updateSelectedSummoner, (state, action) => {
            state.selected = action.payload
        })
        .addCase(setLoaded, (state, action) => {
            state.loaded = action.payload
        })
)
