// Import action types
import {
    FETCH_RIDER,
    ADD_RIDER,
    UPDATE_RIDER,
    DELETE_RIDER,
    RESET
  } from './action_creators'; // assuming actionTypes.js is the file where action types are defined
  
  // Initial state for the rider reducer
  const initialState = {
    riders: [], searchedrider: []
  };
  
  // Rider reducer function
  const riderReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RIDER:
        // Handle fetch rider action
        const fetchRider = state.riders.filter(
          (rider) => rider.id === action.payload
        );
        return {
          ...state,
          searchedrider: fetchRider,
        };
      case ADD_RIDER:
        // Handle add rider action
        //const { id, name } = action.payload
        return {
          ...state,
          riders: [...state.riders, action.payload], // assuming action.payload is the new rider object
        };
      case RESET:
          return {
            ...state,
            riders: []
          }
      case UPDATE_RIDER:
        // Handle update rider action
        const updatedRiders = state.riders.map((rider) =>
          rider.id === action.payload.id ? action.payload.updatedDetails : rider
        );
        return {
          ...state,
          riders: updatedRiders,
        };
      case DELETE_RIDER:
        // Handle delete rider action
        const filteredRiders = state.riders.filter(
          (rider) => rider.id !== action.payload
        );
        const deleteRider = state.searchedrider.filter(
          (rider) => rider.id !== action.payload
        );
        return {
          ...state,
          riders: filteredRiders, searchedrider: deleteRider
        };
      default:
        return state;
    }
  };
  
  export default riderReducer;
  