import React, { useEffect } from "react";
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
import DateFnsUtils from "@date-io/date-fns";
import * as actions from "../actions/activities";
import { useStyles, renderTextField } from "../components/auth/signin";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

function AddActivity(props) {
  const {
    isActivityDialogOpen,
    errorMessage,
    auth,
    handleSubmit,
    closeAddActivityDialog
  } = props;
  const classes = useStyles();

  const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return;
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>;
    }
  };

  const onSubmit = formProps => {
    props.actionOnActivity(props.dialogTitle, formProps, auth, () => {
      props.getActivities(auth, props.globalDate);
    });
  };
  function handleDialogState() {
    props.openAddActivityDialog();
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
  const renderCustomDatePicker = ({
    label,
    input,
    id,
    value,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date"
        autoOk
        fullWidth
        inputVariant="outlined"
        {...input}
        {...custom}
      />
    </MuiPickersUtilsProvider>
  );
  return (
    <Dialog
      open={isActivityDialogOpen}
      onClose={handleDialogState}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{`${props.dialogTitle} an activity`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please add the details of your activity
        </DialogContentText>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field
            name="activityType"
            component={renderSelectField}
            label="Activity Type"
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
            name="category"
            component={renderSelectField}
            label="Category Type"
          >
            {props.categories.map(category => (
              <option key={category.iconName} value={category.iconName}>
                {category.name}
              </option>
            ))}
          </Field>

          <Field
            id="date"
            name="date"
            placeholder="Date"
            component={renderCustomDatePicker}
          />

          <Field
            id="amount"
            name="amount"
            type="number"
            placeholder="Amount"
            component={renderTextField}
            autoComplete="none"
          />
          <div>{errorMessage}</div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddActivityDialog} color="primary">
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
    isActivityDialogOpen: state.activities.isActivityDialogOpen,
    auth: state.auth.authenticated,
    globalDate: state.activities.globalDate,
    dialogTitle: state.activities.dialogTitle,
    initialValues: state.activities.initialValues, // pull initial values
    categories: state.auth.userCategories
  };
};

let InitializeFromStateForm = reduxForm({
  form: "actionOnActivity",
  enableReinitialize: true
})(AddActivity);
export default connect(mapStateToProps, actions)(InitializeFromStateForm);
