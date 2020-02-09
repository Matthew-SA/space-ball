import { connect } from "react-redux";
import Toggle from "./toggle";
import { fetchInventory } from "../../../actions/inventory_actions";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  // user: state.session.user,
  inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
  fetchInventory: () => dispatch(fetchInventory())
});

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
