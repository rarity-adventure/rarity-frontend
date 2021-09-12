import application from "./application/reducer";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  application,
});

export default reducer;
