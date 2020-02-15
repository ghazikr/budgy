import React from "react";
import ListChart from "./list_chart";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ListChart type="expense" title="Expenses" />
      <ListChart type="income" title="Income" />
    </div>
  );
}

export default Dashboard;
