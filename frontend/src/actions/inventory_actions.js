import axios from "axios";

export const RECEIVE_INVENTORY = 'RECEIVE_INVENTORY';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CREATE_INVENTORY = 'CREATE_INVENTORY';
export const ADD_SHIP = 'ADD_SHIP';
export const ADD_BALL = 'ADD_BALL';
export const REMOVE_SHIP = 'REMOVE_SHIP';
export const REMOVE_BALL = 'REMOVE_BALL';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const SELECT_SHIP = 'SELECT_SHIP';
export const SELECT_BALL = 'SELECT_BALL'

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
    .patch("/api/inventory/addship", { ship: ship })
    .then(res =>
      dispatch({
        type: ADD_SHIP,
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

export const removeShip = ship => dispatch => {
  axios
    .patch("api/inventory/removeship", { ship: ship })
    .then(res => 
      dispatch({
        type: REMOVE_SHIP,
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

export const addBall = ball => dispatch => {
  axios
    .patch("/api/inventory/addball", { ball: ball })
    .then(res =>
      dispatch({
        type: ADD_BALL,
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

export const removeBall = ball => dispatch => {
  axios
    .patch("api/inventory/removeball", { ball: ball })
    .then(res =>
      dispatch({
        type: REMOVE_BALL,
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

export const selectShip = ship => dispatch => {
  axios
    .patch("/api/inventory/selectship", { gameoptions: ship })
    .then(res => 
      dispatch({
        type: SELECT_SHIP,
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

export const selectBall = ball => dispatch => {
  axios
    .patch("/api/inventory/selectball", { gameoptions: ball })
    .then(res => 
      dispatch({
        type: SELECT_BALL,
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
