import { createSelector } from "reselect";

const getActivities = state => state.activities.data;
const getType = (state, props) => props.type;

export const getVisibleActivities = createSelector(
  [getActivities, getType],
  (activities, type) => {
    switch (visibilityFilter) {
      case "SHOW_ALL":
        return todos;
      case "SHOW_COMPLETED":
        return todos.filter(t => t.completed);
      case "SHOW_ACTIVE":
        return todos.filter(t => !t.completed);
    }
  }
);
