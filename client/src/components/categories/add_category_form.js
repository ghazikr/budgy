import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as actions from "../../actions/activities";
import { useStyles } from "../../components/auth/signin";
import { MyTextField, MySelectField } from "../cutom_forms_fiels";
import { Formik } from "formik";
import { CATEGORY_TYPES } from "../../utils";
import { MenuItem } from "@material-ui/core";

function AddCategory(props) {
  const {
    auth,
    dialogProps: { open, setOpen },
    categories
  } = props;
  const classes = useStyles();

  const onSubmit = formProps => {
    props.addCategory(formProps, auth, () => {
      props.getCategories(auth);
      setOpen(false);
    });
  };
  const categoriesItems = categories.map(category => (
    <MenuItem key={category.iconName} value={category.iconName}>
      {category.name}
    </MenuItem>
  ));
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a category</DialogTitle>
      <Formik
        initialValues={{
          type: "expense",
          name: "",
          iconName: ""
        }}
        onSubmit={onSubmit}
      >
        {({ values, handleSubmit }) => (
          <>
            <DialogContent>
              <DialogContentText>
                Please add the details of your category
              </DialogContentText>
              <form onSubmit={handleSubmit}>
                <MySelectField
                  name="type"
                  type="input"
                  label="Category Type"
                  items={CATEGORY_TYPES}
                ></MySelectField>
                <MyTextField name="name" type="text" label="Name" />
                <MySelectField
                  name="iconName"
                  type="input"
                  label="Icon"
                  items={categoriesItems}
                ></MySelectField>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth.authenticated,
    categories: state.auth.userCategories
  };
};

export default connect(mapStateToProps, actions)(AddCategory);
