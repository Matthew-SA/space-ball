import { connect } from "react-redux";
import Board from "./board";
import { fetchLeaderboard } from "../../../../actions/leaderboard_actions";

const mapStateToProps = state => ({
  leaderboard: Object.values(state.leaderboard)
});

const mapDispatchToProps = dispatch => ({
  fetchLeaderboard: () => dispatch(fetchLeaderboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
