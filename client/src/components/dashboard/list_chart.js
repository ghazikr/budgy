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
import requireAuth from "../hoc/requireAuth";
import Icon from "@material-ui/core/Icon";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const createChartData = activities =>
  activities.map(activity => ({ name: activity.name, value: activity.amount }));

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

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
  const { auth, globalDate, activities } = props;
  const data = createChartData(activities);
  useEffect(() => {
    props.getActivities(auth, globalDate);
  }, [globalDate]);

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
        <ListItem>
          <PieChart width={400} height={200}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx={120}
              cy={80}
              innerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              label
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend align="right" verticalAlign="top" layout="vertical" />
          </PieChart>
        </ListItem>
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
