import {
  AUTH_USER,
  AUTH_ERROR,
  GET_CATEGORIES,
  GET_CATEGORIES_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: localStorage.getItem("token") || "",
  errorMessage: "",
  userCategories: []
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case GET_CATEGORIES:
      return {
        ...state,
        userCategories: action.payload
      };
    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
