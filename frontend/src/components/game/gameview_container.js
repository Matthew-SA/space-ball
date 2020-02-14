import { connect } from "react-redux";
import { fetchInventory } from "../../actions/inventory_actions"
import GameView from "./gameview";

const mapStateToProps = state => ({
    user: state.session.user,
    // selected: {
    //     ship: state.inventory.selected[0],
    //     ball: state.inventory.selected[1]
    // }
    selected: state.inventory.selected
});

const mapDispatchToProps = dispatch => ({
    fetchInventory: () => dispatch(fetchInventory())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
