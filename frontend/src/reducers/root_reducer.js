import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import sessionErrors from "./session_errors_reducer";
import statsReducer from "./stats_reducer";
import leaderboardReducer from "./leaderboard_reducer";
// import customizeReducer from "./customize_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  sessionErrors,
  stats: statsReducer,
  leaderboard: leaderboardReducer
  // customize: customizeReducer
});

export default RootReducer;
