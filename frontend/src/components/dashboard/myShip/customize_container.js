import { connect } from "react-redux";
import Customize from "./customize";

const mapStateToProps = state => {
  console.log("state", state)
  return {
    currency: state.session.user.currency
  };
};

const mapDispatchToProps = dispatch => ({
  // fetchCurrency: () => dispatch(fetchCurrency())
});

export default connect(mapStateToProps, mapDispatchToProps)(Customize);
