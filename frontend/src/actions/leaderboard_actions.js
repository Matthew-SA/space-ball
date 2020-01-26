import axios from "axios";

export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_LEADERBOARDS = "RECEIVE_LEADERBOARDS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const fetchLeaderboard = () => dispatch => {
  axios
    .get("/api/leaderboard")
    .then(res =>
      dispatch({
        type: RECEIVE_LEADERBOARDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_LEADERBOARDS,
        payload: null
      })
    );
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};