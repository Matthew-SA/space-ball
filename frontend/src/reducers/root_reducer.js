import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import sessionErrors from "./session_errors_reducer";
import sessionAPI from "./session_api_reducer";
import statsReducer from "./stats_reducer";
import leaderboardReducer from "./leaderboard_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  sessionErrors,
  sessionAPI,
  stats: statsReducer,
  leaderboard: leaderboardReducer
});

export default RootReducer;
