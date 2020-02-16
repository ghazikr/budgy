import {
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES,
  REMOVE_CATEGORY_ERROR,
  REMOVE_CATEGORY,
  UPDATE_TAB_ID
} from "./types";
import axios from "axios";

export const updateTabId = tabId => ({
  type: UPDATE_TAB_ID,
  payload: tabId
});

export const getCategories = auth => dispatch => {
  const config = {
    headers: {
      authorization: auth
    }
  };
  axios
    .get("http://localhost:5000/user_categories", config)
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.userCategories
      });
    })
    .catch(e => {
      dispatch({
        type: GET_CATEGORIES_ERROR,
        payload: "error retrieving data"
      });
    });
};

export const deleteCategory = (name, auth, callback) => dispatch => {
  const config = {
    headers: {
      authorization: auth
    }
  };
  axios
    .post(
      "http://localhost:5000/remove_category",
      {
        name
      },
      config
    )
    .then(res => {
      callback();
      dispatch({
        type: REMOVE_CATEGORY
      });
    })
    .catch(e => {
      dispatch({
        type: REMOVE_CATEGORY_ERROR,
        payload: "Problem removing a category !"
      });
    });
};
