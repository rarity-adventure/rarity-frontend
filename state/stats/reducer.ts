import { createReducer } from '@reduxjs/toolkit'
import { updateStats } from './actions'

export interface StatsState {
    readonly data: { globals: []; classes: []; levels: [] }
}

const initialState: StatsState = {
    data: { globals: [], classes: [], levels: [] },
}

export default createReducer(initialState, (builder) =>
    builder.addCase(updateStats, (state, action) => {
        state.data = action.payload
    })
)
