import { combineReducers } from "redux";
import app from "./AppReducers";
import client from "./ClientReducers";

export default combineReducers({
  client
});
