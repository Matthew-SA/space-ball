import { connect } from "react-redux";
import { signup, clearErrors } from "../../../actions/session_actions";
import { createStat } from "../../../actions/stats_actions";
import { createInventory } from "../../../actions/inventory_actions";
import SignupForm from "./signup_form";

const mapStateToProps = state => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: user => dispatch(signup(user)),
    createStat: user => dispatch(createStat(user)),
    createInventory: user => dispatch(createInventory(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
