import { connect } from "react-redux";
import { fetchStats } from "../../../../actions/stats_actions";
import MyStats from "./myStats";

const mapStateToProps = state => {
  // debugger
  return {
    loggedIn: state.session.isAuthenticated,
    stats: state.stats
  };
};

const mapDispatchToProps = dispatch => ({
  fetchStats: () => dispatch(fetchStats())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyStats);
