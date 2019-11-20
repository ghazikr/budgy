import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_ERROR,
  OPEN_ADD_ACTIVITY_DIALOG,
  ADD_ACTIVITY,
  CLOSE_ADD_ACTIVITY_DIALOG,
  UPDATE_GLOBAL_DATE
} from "../actions/types";

const INTIAL_STATE = {
  data: [],
  errorMessage: "",
  isAddActivityDialogOpen: false,
  globalDate: new Date(),
  incomeValue: 0,
  expensesValue: 0,
  balance: 0
};
function getTotalValue(activities, type) {
  const value = activities.reduce((total, { activityType, amount }) => {
    return activityType === type ? total + amount : total;
  }, 0);
  return value;
}
export default function(state = INTIAL_STATE, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      const expenses = getTotalValue(action.payload.activities, "expense");
      const income = getTotalValue(action.payload.activities, "income");
      const balance = income - expenses;

      return {
        ...state,
        data: action.payload.activities,
        income,
        expenses,
        balance
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
    case UPDATE_GLOBAL_DATE:
      return {
        ...state,
        globalDate: action.payload
      };

    default:
      return state;
  }
}
