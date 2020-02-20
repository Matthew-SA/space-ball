import { connect } from "react-redux";
import Ship from "./ship";
import { fetchInventory, selectShip } from "../../../../actions/inventory_actions";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  inventory: state.inventory,
});

const mapDispatchToProps = dispatch => ({
  fetchInventory: () => dispatch(fetchInventory()),
  selectShip: ship => dispatch(selectShip(ship))
});

export default connect(mapStateToProps, mapDispatchToProps)(Ship);
