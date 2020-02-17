import {
  GET_CATEGORIES,
  GET_CATEGORIES_ERROR,
  UPDATE_TAB_ID,
  ADD_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  userCategories: [],
  tabId: 0,
  categoryToAdd: {}
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    case UPDATE_TAB_ID:
      return {
        ...state,
        tabId: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categoryToAdd: action.payload
      };
    default:
      return state;
  }
}
