import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import * as actions from "../actions/activities";
import { useStyles, renderTextField } from "../components/auth/signin";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
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
  const onSubmit = formProps => {
    console.log(formProps);

    props.addActivity(formProps, auth, () => {
      props.getActivities(auth);
    });
  };
  function handleDialogState() {
    props.openAddActivityDialog();
  }

  const handleDateChange = date => {
    // setSelectedDate(date);
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
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
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

  const classes = useStyles();
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
          <Button type="submit" color="primary">
            Save
          </Button>
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
  auth: state.auth.authenticated
});

export default compose(
  reduxForm({ form: "addActivity" }),
  connect(mapStateToProps, actions)
)(AddActivity);
