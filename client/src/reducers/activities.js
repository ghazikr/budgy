import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_ERROR,
  UPDATE_GLOBAL_DATE,
  UPDATE_SELECTED,
  ADD_CATEGORY_ERROR
} from "../actions/types";

const INTIAL_STATE = {
  data: [],
  dialogTitle: "Add",
  globalDate: new Date(),
  incomeValue: 0,
  expensesValue: 0,
  balance: 0,

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
        dialogTitle: "Modify"
      };

    default:
      return state;
  }
}
