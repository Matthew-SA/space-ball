import axios from "axios";

export const RECEIVE_INVENTORY = 'RECEIVE_INVENTORY';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CREATE_INVENTORY = 'CREATE_INVENTORY';

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
  return axios.post("/api/inventory", user)
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
