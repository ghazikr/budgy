import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_ERROR,
  OPEN_ADD_ACTIVITY_DIALOG,
  ADD_ACTIVITY,
  CLOSE_ADD_ACTIVITY_DIALOG,
  UPDATE_GLOBAL_DATE,
  UPDATE_SELECTED,
  OPEN_ADD_CATEGORY_DIALOG,
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY,
  CLOSE_ADD_CATEGORY_DIALOG
} from "../actions/types";

const INTIAL_STATE = {
  data: [],
  dialogTitle: "Add",
  isActivityDialogOpen: false,
  globalDate: new Date(),
  incomeValue: 0,
  expensesValue: 0,
  balance: 0,
  initialValues: {
    activityType: "expense",
    date: new Date(),
    category: "fitness_center"
  },
  errorMessage: "",
  isCategoryDialogOpen: false
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
    case ADD_CATEGORY_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };

    case OPEN_ADD_ACTIVITY_DIALOG:
      return {
        ...state,
        isActivityDialogOpen: true
      };
    case OPEN_ADD_CATEGORY_DIALOG:
      return {
        ...state,
        isCategoryDialogOpen: true
      };
    case ADD_ACTIVITY:
    case CLOSE_ADD_ACTIVITY_DIALOG:
      return {
        ...state,
        isActivityDialogOpen: false
      };
    case ADD_CATEGORY:
    case CLOSE_ADD_CATEGORY_DIALOG:
      return {
        ...state,
        isCategoryDialogOpen: false
      };
    case UPDATE_GLOBAL_DATE:
      return {
        ...state,
        globalDate: action.payload
      };
    case UPDATE_SELECTED:
      return {
        ...state,
        initialValues: {
          ...state.initialValues,
          ...action.payload,
          category: action.payload.category.name
        },
        isActivityDialogOpen: true,
        dialogTitle: "Modify"
      };

    default:
      return state;
  }
}
