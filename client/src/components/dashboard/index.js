import React, { useEffect } from "react";
import ListChart from "./list_chart";
import { makeStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/activities";
import requireAuth from "../hoc/private_route";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const { auth, globalDate, activities, getActivities } = props;
  useEffect(() => {
    if (activities.length === 0) {
      getActivities(auth, globalDate);
    }
  }, [globalDate, getActivities, activities, auth]);

  return (
    <div className={classes.container}>
      <ListChart type="expenses" title="Expenses" />
      <ListChart type="income" title="Income" />
    </div>
  );
}
function mapStateToProps(state, props) {
  return {
    activities: state.activities.data,
    auth: state.auth.authenticated,
    globalDate: state.activities.globalDate
  };
}
export default compose(connect(mapStateToProps, actions))(Dashboard);
