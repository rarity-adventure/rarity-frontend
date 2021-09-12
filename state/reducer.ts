import application from './application/reducer'
import multicall from './multicall/reducer'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
    application,
    multicall
})

export default reducer
