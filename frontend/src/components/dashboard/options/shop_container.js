import { connect } from "react-redux";
import { buyShip, fetchInventory } from "../../../actions/inventory_actions";
import Shop from "./shop";

const mapStateToProps = state => {
  console.log("state", state)
  return {
    currency: state.session.user.currency,
    inventory: state.inventory,
    user: state.session.user
  };
};

const mapDispatchToProps = dispatch => ({
  buyShip: selection => dispatch(buyShip(selection)),
  fetchInventory: () => dispatch(fetchInventory())
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
