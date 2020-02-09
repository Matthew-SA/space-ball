import { connect } from "react-redux";
import Ball from "./ball";

const mapStateToProps = state => ({
  // loggedIn: state.session.isAuthenticated,
  inventory: state.inventory,
  // user: state.session.user
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Ball);
