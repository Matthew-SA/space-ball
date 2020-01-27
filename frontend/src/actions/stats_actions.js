import axios from "axios";

export const RECEIVE_STATS = 'RECEIVE_STATS';
export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD';
export const CLEAR_STATS = 'CLEAR_STATS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CREATE_STAT = 'CREATE_STAT'

export const fetchStats = () => dispatch => {
  axios
    .get("/api/stats")
    .then(res =>
      dispatch({
        type: RECEIVE_STATS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_STATS,
        payload: null
      })
    );
};

export const createStat = (statData) => dispatch => {
  // dispatch(clearStats());
  axios
    .post("/api/stats", statData)
    .then(res =>
      dispatch({
        type: CREATE_STAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err
      })
    );
};

export const clearStats = () => ({ type: CLEAR_STATS });