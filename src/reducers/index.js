import { combineReducers } from "redux";
import app from "./AppReducers";
import client from "./Client";
import room from "./Room"
export default combineReducers({
  client,
  room
});
