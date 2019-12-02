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
import * as actions from "../../actions/activities";
import { BASIC_CATEGORIES } from "../../utils";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddActivity from "./add_activity";
import { compose } from "redux";
import requireAuth from "../hoc/requireAuth";
import Icon from "@material-ui/core/Icon";
import { useDialog } from "../categories";

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
    justifyContent: "space-around",
    marginBottom: 5
  }
}));

function Activity(props) {
  const classes = useStyles();
  const dialogProps = useDialog();
  const { auth, globalDate, activities } = props;
  useEffect(() => {
    props.getCategories(auth);
  });

  useEffect(() => {
    props.getActivities(auth, globalDate);
  }, [globalDate]);

  function handleListItemClick(e, activity) {
    props.updateSelected(activity);
  }

  return (
    <>
      <Paper className={classes.paperRoot}>
        <div>
          <Typography variant="h5" component="h3">
            Income
          </Typography>
          <Typography component="p">{`${props.income}`}</Typography>
        </div>
        <div>
          <Typography variant="h5" component="h3">
            Expenses
          </Typography>
          <Typography component="p">{`${props.expenses}`}</Typography>
        </div>
        <div>
          <Typography variant="h5" component="h3">
            Balance
          </Typography>
          <Typography component="p">{`${props.balance}`}</Typography>
        </div>
      </Paper>
      <Paper className={classes.paperRoot}>
        <List
          className={classes.root}
          subheader={
            <ListSubheader component="div" id="recent-activity">
              Recent Activity
            </ListSubheader>
          }
        >
          {activities.map((activity, index) => (
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
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={() => dialogProps.setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Paper>
      <AddActivity dialogProps={dialogProps} />
    </>
  );
}
function mapStateToProps(state) {
  return {
    activities: state.activities.data,
    auth: state.auth.authenticated,
    globalDate: state.activities.globalDate,
    income: state.activities.income,
    expenses: state.activities.expenses,
    balance: state.activities.balance
  };
}
export default compose(
  connect(mapStateToProps, actions),
  requireAuth
)(Activity);
