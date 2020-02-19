import { connect } from "react-redux";
import { fetchInventory } from "../../actions/inventory_actions"
import GameView from "./gameview";

const mapStateToProps = state => ({
    user: state.session.user,
    gameoptions: state.inventory.gameoptions
});

const mapDispatchToProps = dispatch => ({
    fetchInventory: () => dispatch(fetchInventory())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
