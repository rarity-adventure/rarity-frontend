import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'
import application from './application/reducer'
import user from './user/reducer'

import { updateVersion } from './global/actions'
const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
    reducer: {
        application,
        user,
    },
    middleware: [...getDefaultMiddleware({ thunk: false, immutableCheck: false }), save({ states: PERSISTED_KEYS })],
    preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
