import { connect } from "react-redux";
import { fetchStats } from "../../../../actions/stats_actions";
import Stats from "./stats";

const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    stats: state.stats,
    user: state.session.user.username || null
  };
};

const mapDispatchToProps = dispatch => ({
  fetchStats: () => dispatch(fetchStats())
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
