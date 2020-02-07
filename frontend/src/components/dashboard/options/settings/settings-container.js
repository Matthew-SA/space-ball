import { connect } from "react-redux";
import Settings from "./settings";

const mapStateToProps = state => {
  // console.log("state", state)
  return {
    currency: state.session.user.currency,
    inventory: state.inventory,
    user: state.session.user
  };
};

const mapDispatchToProps = dispatch => ({
  // addShip: selection => dispatch(addShip(selection)),
  // fetchInventory: () => dispatch(fetchInventory()),
  // changeCurrency: amount => dispatch(changeCurrency(amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
