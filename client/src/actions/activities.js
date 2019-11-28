import axios from "axios";
import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_ERROR,
  ADD_ACTIVITY,
  ADD_ACTIVITY_ERROR,
  OPEN_ADD_ACTIVITY_DIALOG,
  CLOSE_ADD_ACTIVITY_DIALOG,
  UPDATE_GLOBAL_DATE,
  UPDATE_SELECTED,
  GET_CATEGORIES,
  GET_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR,
  OPEN_ADD_CATEGORY_DIALOG,
  CLOSE_ADD_CATEGORY_DIALOG,
  REMOVE_CATEGORY,
  REMOVE_CATEGORY_ERROR
} from "./types";

export const getActivities = (auth, currentDate) => dispatch => {
  const config = {
    headers: {
      authorization: auth
    }
  };
  axios
    .post(
      "http://localhost:5000/activity",
      {
        currentDate
      },
      config
    )
    .then(res => {
      dispatch({
        type: GET_ACTIVITIES,
        payload: res.data
      });
    })
    .catch(e => {
      dispatch({
        type: GET_ACTIVITIES_ERROR,
        payload: "error retrieving data"
      });
    });
};
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

export const actionOnActivity = (
  DialogTitle,
  { name, category, amount, date, activityType, _id },
  auth,
  callback
) => dispatch => {
  const config = {
    headers: {
      authorization: auth
    }
  };

  axios
    .post(
      `http://localhost:5000/${
        DialogTitle === "Add" ? "add_activity" : "update_activity"
      }`,
      {
        name,
        category,
        amount,
        date,
        activityType,
        _id
      },
      config
    )
    .then(res => {
      callback();
      dispatch({
        type: ADD_ACTIVITY
      });
    })
    .catch(e => {
      dispatch({
        type: ADD_ACTIVITY_ERROR,
        payload: "Problem adding a new activity !"
      });
    });
};
export const addCategory = (
  { name, type, iconName },
  auth,
  callback
) => dispatch => {
  const config = {
    headers: {
      authorization: auth
    }
  };
  axios
    .post(
      "http://localhost:5000/add_category",
      {
        name,
        type,
        iconName
      },
      config
    )
    .then(res => {
      callback();
      dispatch({
        type: ADD_CATEGORY
      });
    })
    .catch(e => {
      dispatch({
        type: ADD_CATEGORY_ERROR,
        payload: "Problem adding a new category !"
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

export const openAddActivityDialog = () => ({
  type: OPEN_ADD_ACTIVITY_DIALOG
});
export const openAddCategoryDialog = () => ({
  type: OPEN_ADD_CATEGORY_DIALOG
});
export const closeAddActivityDialog = () => ({
  type: CLOSE_ADD_ACTIVITY_DIALOG
});
export const closeAddCategoryDialog = () => ({
  type: CLOSE_ADD_CATEGORY_DIALOG
});
export const updateGlobalDate = date => ({
  type: UPDATE_GLOBAL_DATE,
  payload: date
});
export const updateSelected = activity => ({
  type: UPDATE_SELECTED,
  payload: activity
});
