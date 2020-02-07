import { connect } from "react-redux";
import { logout, clearErrors } from "../../../actions/session_actions";
import { clearStats } from "../../../actions/stats_actions";

import Options from "./options";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  user: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  clearErrors: () => dispatch(clearErrors()),
  clearStats: () => dispatch(clearStats())
})

export default connect(mapStateToProps, mapDispatchToProps)(Options);
