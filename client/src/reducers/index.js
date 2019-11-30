import { combineReducers } from "redux";
import auth from "./auth";
import activities from "./activities";

export default combineReducers({
  auth: auth,
  activities: activities
});
