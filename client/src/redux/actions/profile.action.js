import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
} from "../actionTypes/profile.action.types";
import { GET_ERRORS } from "../actionTypes/actionTypes";

import userActionTypes from "../actionTypes/auth.action.types";
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profile")
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then((res) => {
      return dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    );
};

// Get profile by handle
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
};

// add profile
export const createUserProfile = (userrofile, history) => (dispatch) => {
  // dispatch(setProfileLoading());
  axios
    .post("/api/profile", userrofile)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// add Experience
export const addExperience = (expData, history) => (dispatch) => {
  // dispatch(setProfileLoading());
  axios
    .post("/api/profile/experience", expData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// add Education
export const addEducation = (eduData, history) => (dispatch) => {
  // dispatch(setProfileLoading());
  axios
    .post("/api/profile/education", eduData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete Experience
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete Education
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// setProfileLoading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// add profile
export const deleteAccount = () => (dispatch) => {
  // dispatch(setProfileLoading());
  if (
    window.confirm("Are you sure ,you want to delet account, it can be undo!")
  ) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: userActionTypes.SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// setProfileLoading

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
