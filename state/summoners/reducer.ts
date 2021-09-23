import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { createReducer } from '@reduxjs/toolkit'
import { setLoading, syncSummoners, updateSummoners } from './actions'

export interface SummonersState {
    readonly data: SummonerFullData[]
    readonly loading: boolean
}

const initialState: SummonersState = {
    data: [],
    loading: true,
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateSummoners, (state, action) => {
            state.data = action.payload
        })
        .addCase(setLoading, (state, action) => {
            state.loading = action.payload
        })
        .addCase(syncSummoners, (state, action) => {
            console.log('syncSummoners')
        })
)
