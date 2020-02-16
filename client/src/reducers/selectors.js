import { createSelector } from "reselect";

const getCategories = state => state.categories.userCategories;
const getTabId = (state, props) => state.categories.tabId;

export const getFilteredCategories = createSelector(
  [getCategories, getTabId],
  (categories, tabId) => {
    switch (tabId) {
      case 0:
        return categories.filter(elem => elem.type === "expenses");
      case 1:
        return categories.filter(elem => elem.type === "income");
      default:
        return categories;
    }
  }
);
