import axios from "axios";
import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_ERROR,
  ADD_ACTIVITY,
  ADD_ACTIVITY_ERROR,
  UPDATE_GLOBAL_DATE,
  UPDATE_SELECTED,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR
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

export const updateGlobalDate = date => ({
  type: UPDATE_GLOBAL_DATE,
  payload: date
});
export const updateSelected = activity => ({
  type: UPDATE_SELECTED,
  payload: activity
});
