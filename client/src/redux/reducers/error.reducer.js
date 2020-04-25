import { GET_ERRORS } from "../actionTypes/actionTypes";

const INITAL_STATE = {};

const errorReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
