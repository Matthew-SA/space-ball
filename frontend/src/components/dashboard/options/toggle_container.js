import { connect } from "react-redux";
import Toggle from "./toggle";
import { 
  fetchInventory, 
  addShip, 
  addBall, 
  removeShip, 
  removeBall, 
  selectShip, 
  selectBall, 
  changeCurrency 
} from "../../../actions/inventory_actions";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
  fetchInventory: () => dispatch(fetchInventory()),
  addShip: ship => dispatch(addShip(ship)),
  addBall: ball => dispatch(addBall(ball)),
  removeShip: ship => dispatch(removeShip(ship)),
  removeBall: ball => dispatch(removeBall(ball)),
  selectShip: ship => dispatch(selectShip(ship)),
  selectBall: ball => dispatch(selectBall(ball)),
  changeCurrency: amount => dispatch(changeCurrency(amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
