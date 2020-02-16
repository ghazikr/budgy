import { combineReducers } from "redux";
import auth from "./auth";
import activities from "./activities";
import categories from "./categories";

export default combineReducers({
  auth: auth,
  activities: activities,
  categories: categories
});
