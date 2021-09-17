import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { createReducer } from '@reduxjs/toolkit'
import { updateSummoners } from './actions'

export interface SummonersState {
    readonly data: SummonerFullData[]
}

const initialState: SummonersState = {
    data: [],
}

export default createReducer(initialState, (builder) =>
    builder.addCase(updateSummoners, (state, action) => {
        state.data = action.payload
    })
)
