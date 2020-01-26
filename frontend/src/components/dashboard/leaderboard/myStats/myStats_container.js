import { connect } from "react-redux";
import { fetchStats } from "../../../../actions/stats_actions";
import MyStats from "./myStats";

const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    stats: state.stats,
    user: state.session.user.username || null
  };
};

const mapDispatchToProps = dispatch => ({
  fetchStats: () => dispatch(fetchStats())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyStats);
