import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
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
    isAddActivityDialogOpen,
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
    props.addActivity(formProps, auth, () => {
      props.getActivities(auth, props.currentDate);
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
  }) => (
    <FormControl
      className={classes.formControl}
      variant="outlined"
      error={touched && error}
      fullWidth
    >
      <InputLabel htmlFor="activity-type">Type</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name: "activityType",
          id: "activity-type"
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
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
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date"
        {...input}
        // value={new Date()}
        // onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );

  return (
    <Dialog
      open={isAddActivityDialogOpen}
      onClose={handleDialogState}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add an activity</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please add the details of your activity
        </DialogContentText>
        {/* <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        /> */}
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field
            classes={classes}
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
            type="text"
            placeholder="Category"
            component={renderTextField}
            autoComplete="none"
          />

          <Field
            id="date"
            name="date"
            placeholder="Date"
            component={renderCustomDatePicker}
            autoComplete="none"
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

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  isAddActivityDialogOpen: state.activities.isAddActivityDialogOpen,
  auth: state.auth.authenticated,
  currentDate: state.activities.currentDate
});

export default compose(
  reduxForm({ form: "addActivity" }),
  connect(mapStateToProps, actions)
)(AddActivity);
