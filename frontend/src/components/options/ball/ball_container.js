import { connect } from "react-redux";
import Ball from "./ball";
import { fetchInventory, selectBall } from "../../../actions/inventory_actions";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  inventory: state.inventory,
});

const mapDispatchToProps = dispatch => ({
  fetchInventory: () => dispatch(fetchInventory()),
  selectBall: ball => dispatch(selectBall(ball))
});

export default connect(mapStateToProps, mapDispatchToProps)(Ball);
