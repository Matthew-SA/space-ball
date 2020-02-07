import { RECEIVE_INVENTORY, CREATE_INVENTORY, ADD_SHIP, CHANGE_CURRENCY } from "../actions/inventory_actions";

export const nullInventory = () => ({ ships: ["Default"], balls: ["Earth"], selected: ["Default", "Earth"] });
// export const nullCurrency = () => ({ currency: [1000] });

const inventoryReducer = (state = nullInventory(), action) => {
  switch (action.type) {
    case RECEIVE_INVENTORY:
      return Object.assign({}, state, action.payload);
    case CREATE_INVENTORY:
      return Object.assign({}, state, action.payload);
    case ADD_SHIP:
      return Object.assign({}, state, action.payload);
    case CHANGE_CURRENCY:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};

export default inventoryReducer;
