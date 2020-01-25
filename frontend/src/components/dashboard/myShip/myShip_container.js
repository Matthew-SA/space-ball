import { connect } from "react-redux";
import { logout } from "../../../actions/session_actions";

import MyShip from "./myShip";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(mapStateToProps, { logout })(MyShip);
