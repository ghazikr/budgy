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
import * as actions from "../../actions/activities";
import { compose } from "redux";
import requireAuth from "../requireAuth";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  root: {
    // width: "50%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    flexGrow: 1
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
    justifyContent: "space-around",
    flexGrow: 1,
    marginBottom: 5
  }
}));

function Activity(props) {
  const classes = useStyles();
  console.log(props.activities);

  //   useEffect(() => {
  //     props.getCategories(props.auth);
  //   });

  useEffect(() => {
    props.getActivities(props.auth, props.globalDate);
  }, [props.globalDate]);

  function handleAddClick() {
    props.openAddActivityDialog();
  }

  function handleListItemClick(e, activity) {
    props.updateSelected(activity);
  }

  return (
    <Paper className={classes.paperRoot}>
      <List
        className={classes.root}
        subheader={
          <ListSubheader component="div" id="recent-activity">
            {props.title}
          </ListSubheader>
        }
      >
        {props.activities.map((activity, index) => (
          <ListItem
            key={index}
            button
            onClick={event => handleListItemClick(event, activity)}
          >
            <ListItemAvatar>
              <Avatar>
                <Icon>{activity.category.iconName}</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={activity.name} secondary={activity.date} />
            {activity.activityType === "expense"
              ? `-${activity.amount}`
              : activity.amount}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
function mapStateToProps(state, props) {
  return {
    activities: state.activities.data.filter(
      activity => activity.activityType === props.type
    ),
    auth: state.auth.authenticated,
    globalDate: state.activities.globalDate
  };
}
export default compose(
  connect(mapStateToProps, actions),
  requireAuth
)(Activity);
