import { connect } from "react-redux";
import Ball from "./ball";

const mapStateToProps = state => ({
  // loggedIn: state.session.isAuthenticated,
  user: state.session.user
});

const mapDispatchToProps = dispatch => ({
  // clearStats: () => dispatch(clearStats())
});

export default connect(mapStateToProps, mapDispatchToProps)(Ball);
