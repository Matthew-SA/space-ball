import { RECEIVE_INVENTORY, CREATE_INVENTORY, BUY_SHIP } from "../actions/inventory_actions";

export const nullInventory = () => ({ ships: ["Default"], balls: ["Earth"], selected: ["Default", "Earth"] });

const inventoryReducer = (state = nullInventory(), action) => {
  switch (action.type) {
    case RECEIVE_INVENTORY:
      return Object.assign({}, state, action.payload);
    case CREATE_INVENTORY:
      return Object.assign({}, state, action.payload);
    case BUY_SHIP:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default inventoryReducer;
