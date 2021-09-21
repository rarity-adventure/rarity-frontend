import { ItemData } from '../../hooks/useRarityLibrary'
import { createReducer } from '@reduxjs/toolkit'
import { setLoading, updateItems } from './actions'

export interface ItemsState {
    readonly data: ItemData[]
    readonly loading: boolean
}

const initialState: ItemsState = {
    data: [],
    loading: true,
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateItems, (state, action) => {
            state.data = action.payload
        })
        .addCase(setLoading, (state, action) => {
            state.loading = action.payload
        })
)
