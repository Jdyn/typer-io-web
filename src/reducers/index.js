import { combineReducers } from "redux";
import client from "./ClientReducers";
import session from "./SessionReducers"

export default combineReducers({
  client,
  session
});
