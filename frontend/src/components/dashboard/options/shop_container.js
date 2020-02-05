import { connect } from "react-redux";
// import { buyShip } from "../../../actions/shop_actions";
import Shop from "./shop";

const mapStateToProps = state => {
  console.log("state", state)
  return {
    currency: state.session.user.currency,
    inventory: state.inventory,
    
  };
};

const mapDispatchToProps = dispatch => ({
  // buyShip: selection => dispatch(buyShip(selection))
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
