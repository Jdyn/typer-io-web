import { combineReducers } from "redux";
import client from "./ClientReducers";
import session from "./SessionReducers";
import matchHistory from "./MatchHistoryReducers";
import forum from "./ForumReducers";

export default combineReducers({
  client,
  session,
  matchHistory,
  forum
});
