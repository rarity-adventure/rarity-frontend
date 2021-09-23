import { createReducer } from '@reduxjs/toolkit'
import { updateAnalytics } from './actions'

export interface SummonersState {
    readonly data: { globals: []; classes: []; levels: [] }
}

const initialState: SummonersState = {
    data: { globals: [], classes: [], levels: [] },
}

export default createReducer(initialState, (builder) =>
    builder.addCase(updateAnalytics, (state, action) => {
        state.data = action.payload
    })
)
