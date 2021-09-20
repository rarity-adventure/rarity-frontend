import application from './application/reducer'
import multicall from './multicall/reducer'
import summoners from './summoners/reducer'
import items from './items/reducer'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
    application,
    multicall,
    summoners,
    items,
})

export default reducer
