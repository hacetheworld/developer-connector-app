import axios from "axios";
import userActionTypes from "../actionTypes/auth.action.types";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/set-authToken";

import { GET_ERRORS } from "../actionTypes/actionTypes";

export const registerUser = (user, history) => (dispatch) => {
  axios
    .post("/api/users/register", user)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get User Token
export const loginUser = (user, history) => (dispatch) => {
  axios
    .post("/api/users/login", user)
    .then((res) => {
      // save token
      console.log(res);

      const { token } = res.data;

      // set token to headers
      localStorage.setItem("jwtToken", token);

      // set token to headers
      setAuthToken(token);

      const decoded = jwt_decode(token);
      console.log(history);

      // set current user in redux store
      dispatch(setCurrentUser(decoded));

      history.push("/dashboard");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// set looged in user

export const setCurrentUser = (decoded) => {
  return {
    type: userActionTypes.SET_CURRENT_USER,
    payload: decoded,
  };
};

// set logged out user

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
