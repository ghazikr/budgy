import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import * as actions from "../actions/activities";
import { BASIC_CATEGORIES } from "../utils";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddActivity from "./add_activity";

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
  }
}));

function Activity(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getActivities(props.auth);
  }, []);

  function handleAddClick() {
    props.openAddActivityDialog();
  }

  return (
    <>
      <List
        className={classes.root}
        subheader={
          <ListSubheader component="div" id="recent-activity">
            Recent Activity
          </ListSubheader>
        }
      >
        {props.activities.map(activity => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>{BASIC_CATEGORIES[activity.category]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={activity.name} secondary={activity.date} />
            <span>{activity.amount}</span>
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
    auth: state.auth.authenticated
  };
}
export default connect(mapStateToProps, actions)(Activity);
