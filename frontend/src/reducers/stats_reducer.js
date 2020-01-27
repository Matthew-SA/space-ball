import { RECEIVE_STATS, CREATE_STAT, CLEAR_STATS } from "../actions/stats_actions";

export const nullStats = () => ({ points: 0, wins: 0, losses: 0 });

const statsReducer = (state = nullStats(), action) => {
  switch (action.type) {
    case RECEIVE_STATS:
      return Object.assign({}, state, action.payload);
    case CREATE_STAT:
      return Object.assign({}, state, action.payload);
    case CLEAR_STATS:
      return nullStats();
    default:
      return state;
  }
};

export default statsReducer;
