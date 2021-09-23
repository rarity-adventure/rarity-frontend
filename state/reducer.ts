import application from './application/reducer'
import summoners from './summoners/reducer'
import items from './items/reducer'
import analytics from './stats/reducer'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
    application,
    summoners,
    analytics,
    items,
})

export default reducer
