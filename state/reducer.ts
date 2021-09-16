import application from './application/reducer'
import multicall from './multicall/reducer'
import user from './user/reducer'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
    application,
    multicall,
    user,
})

export default reducer
