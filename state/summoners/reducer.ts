import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { createReducer } from '@reduxjs/toolkit'
import { updateSummoners } from './actions'

const initialState: SummonerFullData[] = []

export default createReducer(initialState, (builder) =>
    builder.addCase(updateSummoners, (state, action) => {
        state = action.payload
    })
)
