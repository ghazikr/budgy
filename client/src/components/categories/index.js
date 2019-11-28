import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import * as actions from "../../actions/activities";
import { BASIC_CATEGORIES } from "../../utils";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { compose } from "redux";
import requireAuth from "../hoc/requireAuth";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import AddCategoryForm from "./add_category_form";
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

function Categories(props) {
  const classes = useStyles();
  const { auth, categories } = props;
  useEffect(() => {
    props.getCategories(auth);
  });

  function handleAddClick() {
    props.openAddCategoryDialog();
  }

  const handleDeleteCategory = name => e => {
    props.deleteCategory(name, auth, () => {
      props.getCategories(auth);
    });
  };

  return (
    <>
      <Paper className={classes.paperRoot}>
        <List
          className={classes.root}
          subheader={
            <ListSubheader component="div" id="recent-activity">
              Categories
            </ListSubheader>
          }
        >
          {categories.map((category, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <Icon>{category.iconName}</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={category.name} secondary={category.type} />
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
      </Paper>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleAddClick}
      >
        <AddIcon />
      </Fab>
      <AddCategoryForm />
    </>
  );
}
function mapStateToProps(state) {
  return {
    categories: state.auth.userCategories,
    auth: state.auth.authenticated
  };
}
export default compose(
  connect(mapStateToProps, actions),
  requireAuth
)(Categories);
