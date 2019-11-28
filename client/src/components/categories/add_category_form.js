import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as actions from "../../actions/activities";
import { useStyles, renderTextField } from "../../components/auth/signin";

function AddCategory(props) {
  const { auth, handleSubmit } = props;
  const classes = useStyles();

  const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return;
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>;
    }
  };

  const onSubmit = formProps => {
    props.addCategory(formProps, auth, () => {
      props.getCategories(auth);
    });
  };
  function handleDialogState() {
    props.openAddCategoryDialog();
  }
  const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => {
    return (
      <FormControl
        className={classes.formControl}
        variant="outlined"
        error={touched && error}
        fullWidth
      >
        <InputLabel htmlFor="activity-type">{label}</InputLabel>
        <Select
          native
          {...input}
          {...custom}
          // inputProps={{
          //   name: "activityType",
          //   id: "activity-type"
          // }}
        >
          {children}
        </Select>
        {renderFromHelper({ touched, error })}
      </FormControl>
    );
  };

  return (
    <Dialog
      open={props.isCategoryDialogOpen}
      onClose={handleDialogState}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please add the details of your category
        </DialogContentText>
        <form
          className={classes.form}
          noValidate
          //   onSubmit={handleSubmit(onSubmit)}
        >
          <Field
            name="type"
            component={renderSelectField}
            label="Category Type"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Field>
          <Field
            name="name"
            type="text"
            placeholder="Name"
            component={renderTextField}
            autoComplete="none"
          />
          <Field
            name="iconName"
            type="text"
            placeholder="Icon Name"
            component={renderTextField}
            autoComplete="none"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeAddCategoryDialog} color="primary">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogActions>
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

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: "addCategory",
    initialValues: { type: "expense" }
  })(AddCategory)
);
