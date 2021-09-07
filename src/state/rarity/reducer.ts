import { createReducer } from '@reduxjs/toolkit'
import { Metadata, updateMetadata } from './actions'

export interface UserState {
    readonly metadata: Metadata
}

const initialState: UserState = {
    metadata: {
        summoners: 0,
        barbarians: 0,
        bards: 0,
        clerics: 0,
        druids: 0,
        fighters: 0,
        monks: 0,
        paladins: 0,
        rangers: 0,
        rogues: 0,
        sorcerers: 0,
        wizards: 0,
    },
}

export default createReducer(initialState, (builder) =>
    builder.addCase(updateMetadata, (state, action) => {
        state.metadata = action.payload
    })
)
