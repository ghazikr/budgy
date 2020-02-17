import React from "react";
import { MenuItem } from "@material-ui/core";
import { format } from "date-fns";

export const BASIC_CATEGORIES = {
  expenses: [
    { food: "fast_food" },
    { phone: "local_phone" },
    { bills: "receipt" },
    { transportation: "commute" },
    { home: "home_work" },
    { entertainment: "sports_esports" },
    { telephone: "phone" },
    { sport: "fitness_center" },
    { travel: "flight_takeoff" },
    { smoking: "smoking_rooms" }
  ],
  income: [
    {
      salary: "account_balance_account",
      dividends: "trending_up",
      monetization_on_icon: "lottery",
      others: "category"
    }
  ]
};

export const CATEGORY_TYPES = ["expenses", "income"].map(catTypeName => (
  <MenuItem value={catTypeName} key={catTypeName}>
    {catTypeName.charAt(0).toUpperCase() + catTypeName.slice(1)}
  </MenuItem>
));

export const formatDate = date => format(new Date(date), "dd/MM/yyyy HH:mm");
