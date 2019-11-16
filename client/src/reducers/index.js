import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import activities from "./activities";

export default combineReducers({
  auth: auth,
  form: formReducer,
  activities: activities
});
