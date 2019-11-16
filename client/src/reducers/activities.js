import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_ERROR,
  OPEN_ADD_ACTIVITY_DIALOG,
  ADD_ACTIVITY,
  CLOSE_ADD_ACTIVITY_DIALOG
} from "../actions/types";

const INTIAL_STATE = {
  data: [],
  errorMessage: "",
  isAddActivityDialogOpen: false
};
export default function(state = INTIAL_STATE, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        data: action.payload
      };
    case GET_ACTIVITIES_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case OPEN_ADD_ACTIVITY_DIALOG:
      return {
        ...state,
        isAddActivityDialogOpen: true
      };
    case ADD_ACTIVITY:
    case CLOSE_ADD_ACTIVITY_DIALOG:
      return {
        ...state,
        isAddActivityDialogOpen: false
      };

    default:
      return state;
  }
}
