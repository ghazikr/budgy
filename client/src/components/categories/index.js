import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import * as actions from "../../actions/categories";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { compose } from "redux";
import requireAuth from "../hoc/requireAuth";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import AddCategoryForm from "./add_category_form";
import { Tabs, Tab, Paper } from "@material-ui/core";
import { getFilteredCategories } from "../../reducers/selectors";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(2)
  },
  paperRoot: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5
  }
}));

export function useDialog() {
  const [open, setOpen] = useState(false);
  return {
    open,
    setOpen
  };
}

function Categories(props) {
  const classes = useStyles();
  const {
    auth,
    categories,
    getCategories,
    updateTabId,
    tabId,
    categoryToAdd
  } = props;

  const handleChange = (event, newValue) => {
    updateTabId(newValue);
  };
  const dialogProps = useDialog();
  useEffect(() => {
    getCategories(auth);
  }, [auth, getCategories, categoryToAdd]);

  const handleDeleteCategory = name => e => {
    props.deleteCategory(name, auth, () => {
      props.getCategories(auth);
    });
  };

  function TabPanel(props) {
    return (
      <List className={classes.root}>
        {categories.map((category, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <Icon>{category.iconName}</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleDeleteCategory(category.name)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
  return (
    <>
      <Tabs
        value={tabId}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Expenses" />
        <Tab label="Income" />
      </Tabs>
      <TabPanel value={tabId} />
      {/* <TabPanel value={tabId} /> */}
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => dialogProps.setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <AddCategoryForm dialogProps={dialogProps} />
    </>
  );
}
function mapStateToProps(state, props) {
  return {
    categories: getFilteredCategories(state),
    auth: state.auth.authenticated,
    tabId: state.categories.tabId,
    categoryToAdd: state.categories.categoryToAdd
  };
}
export default compose(
  connect(mapStateToProps, actions),
  requireAuth
)(Categories);
