import userActionTypes from "../actionTypes/auth.action.types";

import isEmpty from "../../utils/is-empty";

const INITAL_STATE = {
  isAuthenticated: false,
  user: null,
};
const userReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
