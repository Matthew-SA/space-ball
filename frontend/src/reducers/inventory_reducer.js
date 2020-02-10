import { RECEIVE_INVENTORY, CREATE_INVENTORY, ADD_SHIP, CHANGE_CURRENCY, SELECT_SHIP, SELECT_BALL } from "../actions/inventory_actions";

export const nullInventory = () => ({ currency: 0, ships: ["Default"], balls: ["Earth"], gameoptions: ["Default", "Earth"] });

const inventoryReducer = (state = nullInventory(), action) => {
  switch (action.type) {
    case RECEIVE_INVENTORY:
      return Object.assign({}, state, action.payload);
    case CREATE_INVENTORY:
      return Object.assign({}, state, action.payload);
    case ADD_SHIP:
      return Object.assign({}, state, action.payload);
    case SELECT_SHIP: 
      return Object.assign({}, state, action.payload);
    case SELECT_BALL:
      return Object.assign({}, state, action.payload)
    case CHANGE_CURRENCY:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};

export default inventoryReducer;
