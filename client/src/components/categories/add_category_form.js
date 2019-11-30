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

function AddCategory(props) {
  const { auth } = props;
  const classes = useStyles();

  const onSubmit = formProps => {
    props.addCategory(formProps, auth, () => {
      props.getCategories(auth);
    });
  };
  function handleDialogState() {
    props.openAddCategoryDialog();
  }

  return (
    <Dialog
      open={props.isCategoryDialogOpen}
      onClose={handleDialogState}
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
                  items={[
                    <option value="expense" key="expense">
                      Expense
                    </option>,
                    <option value="income" key="income">
                      Income
                    </option>
                  ]}
                ></MySelectField>
                <MyTextField name="name" type="text" label="Name" />
                <MyTextField name="iconName" type="text" label="Icon Name" />
              </form>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.closeAddCategoryDialog} color="primary">
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
    isCategoryDialogOpen: state.activities.isCategoryDialogOpen,
    auth: state.auth.authenticated,
    categories: state.auth.userCategories
  };
};

export default connect(mapStateToProps, actions)(AddCategory);
