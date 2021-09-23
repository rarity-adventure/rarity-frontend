import application from './application/reducer'
import summoners from './summoners/reducer'
import items from './items/reducer'
import stats from './stats/reducer'
import multicall from './multicall/reducer'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
    application,
    summoners,
    stats,
    multicall,
    items,
})

export default reducer
