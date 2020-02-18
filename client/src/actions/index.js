import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

export const signup = ({ email, password }, callback) => dispatch => {
  axios
    .post("/signup", {
      email,
      password
    })
    .then(res => {
      dispatch({
        type: AUTH_USER,
        payload: res.data
      });

      localStorage.setItem("token", res.data.token);
      callback();
    })
    .catch(e => {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email in use!"
      });
    });
};

export const signin = ({ email, password }, callback) => dispatch => {
  axios
    .post("/signin", {
      email,
      password
    })
    .then(res => {
      dispatch({
        type: AUTH_USER,
        payload: res.data
      });
      localStorage.setItem("token", res.data.token);
      callback();
    })
    .catch(e => {
      dispatch({
        type: AUTH_ERROR,
        payload: "Invalid login credentials !"
      });
    });
};

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: ""
  };
};
