import { combineReducers } from "redux";
import client from "./ClientReducers";
import session from "./SessionReducers";
import matchHistory from "./MatchHistoryReducers";

export default combineReducers({
  client,
  session,
  matchHistory
});
