import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import * as actions from "../actions/activities";
import { BASIC_CATEGORIES } from "../utils";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddActivity from "./add_activity";
import { compose } from "redux";
import requireAuth from "./requireAuth";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  },
  paperRoot: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  }
}));

function Activity(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getActivities(props.auth, props.globalDate);
  }, [props.globalDate]);

  function handleAddClick() {
    props.openAddActivityDialog();
  }

  return (
    <>
      {/* <Paper className={classes.paperRoot}>
        <div>
          <Typography variant="h5" component="h3">
            Income
          </Typography>
          <Typography component="p">bla bla</Typography>
        </div>
        <div>
          <Typography variant="h5" component="h3">
            Expenses
          </Typography>
          <Typography component="p">bla bla</Typography>
        </div>
        <div>
          <Typography variant="h5" component="h3">
            Balance
          </Typography>
          <Typography component="p">bla bla</Typography>
        </div>
      </Paper> */}
      <List
        className={classes.root}
        subheader={
          <ListSubheader component="div" id="recent-activity">
            Recent Activity
          </ListSubheader>
        }
      >
        {props.activities.map((activity, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{BASIC_CATEGORIES[activity.category.name]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={activity.name} secondary={activity.date} />
            {activity.activityType === "expense"
              ? `-${activity.amount}`
              : activity.amount}
          </ListItem>
        ))}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleAddClick}
      >
        <AddIcon />
      </Fab>
      <AddActivity />
    </>
  );
}
function mapStateToProps(state) {
  return {
    activities: state.activities.data,
    auth: state.auth.authenticated,
    globalDate: state.activities.globalDate
  };
}
export default compose(
  connect(mapStateToProps, actions),
  requireAuth
)(Activity);
