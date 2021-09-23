import application from './application/reducer'
import summoners from './summoners/reducer'
import items from './items/reducer'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
    application,
    summoners,
    items,
})

export default reducer
