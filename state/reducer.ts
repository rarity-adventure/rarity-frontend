import application from './application/reducer'
import summoners from './summoners/reducer'
import items from './items/reducer'
import stats from './stats/reducer'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
    application,
    summoners,
    stats,
    items,
})

export default reducer
