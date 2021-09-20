import { Item } from '../../hooks/useRarityLibrary'
import { createReducer } from '@reduxjs/toolkit'
import { updateItems } from './actions'

export interface ItemsState {
    readonly data: Item[]
}

const initialState: ItemsState = {
    data: [],
}

export default createReducer(initialState, (builder) =>
    builder.addCase(updateItems, (state, action) => {
        state.data = action.payload
    })
)
