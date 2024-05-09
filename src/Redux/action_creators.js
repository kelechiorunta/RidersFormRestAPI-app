// Define action types as constants
export const FETCH_RIDER = "FETCH_RIDER";
export const ADD_RIDER = "ADD_RIDER";
export const UPDATE_RIDER = "UPDATE_RIDER";
export const DELETE_RIDER = "DELETE_RIDER";
export const RESET = 'RESET'

// Action creators using arrow functions for concise syntax
export const fetchRider = (id) => ({
  type: FETCH_RIDER,
  payload: id,
});

export const addRider = (details) => ({
  type: ADD_RIDER,
  payload: details,
});

export const updateRider = (id, updatedDetails) => ({
  type: UPDATE_RIDER,
  payload: { id, updatedDetails },
});

export const deleteRider = (id) => ({
  type: DELETE_RIDER,
  payload: id,
});

export const reset = () => ({
    type: RESET
})