import axios from "axios";


export const RECEIVE_INVENTORY = 'RECEIVE_INVENTORY';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CREATE_INVENTORY = 'CREATE_INVENTORY';
export const ADD_SHIP = 'ADD_SHIP';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'

export const fetchInventory = () => dispatch => {
  axios.get("/api/inventory")
    .then(res =>
      dispatch({
        type: RECEIVE_INVENTORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_INVENTORY,
        payload: null
      })
    );
};

export const createInventory = user => dispatch => {
  axios.post("/api/inventory", user)
    .then(res =>
      dispatch({
        type: CREATE_INVENTORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err
      })
    );
};

export const addShip = ship => dispatch => {
  axios
    .patch("/api/inventory/ships", { ship: ship })
    .then(res =>
      dispatch({
        type: ADD_SHIP,
        payload: res.data
      })
    )
    .then(() => dispatch(changeCurrency(-500)))
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err
      })
    );
};

export const changeCurrency = amount => dispatch => {
  axios
    .patch("/api/inventory/currency", { currency: amount })
    .then(res =>
      dispatch({
        type: CHANGE_CURRENCY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err
      })
    );
}
