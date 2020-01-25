import { RECEIVE_STATS } from "../actions/stats_actions";

export const nullStats = () => ({ points: 0, wins: 0, losses: 0 });

const statsReducer = (state = nullStats(), action) => {
  switch (action.type) {
    case RECEIVE_STATS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default statsReducer;
