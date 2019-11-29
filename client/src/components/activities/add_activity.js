import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import DateFnsUtils from "@date-io/date-fns";
import * as actions from "../../actions/activities";
import { useStyles, renderTextField } from "../auth/signin";
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
  const [activeStep, setActiveStep] = React.useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
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
        );
      case 1:
        return (
          <>
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
          </>
        );
      default:
        return "Unknown step";
    }
  }

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
  const steps = ["Choose a category", "Create your activity"];

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if (activeStep === 1) {
      setActiveStep(0);
      closeAddActivityDialog();
      handleSubmit(onSubmit)();
    }
  };
  return (
    <Dialog
      open={isActivityDialogOpen}
      onClose={handleDialogState}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </DialogTitle>
      <DialogContent>
        <div>
          <div>{getStepContent(activeStep)}</div>
        </div>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>{errorMessage}</div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddActivityDialog} color="primary">
          Cancel
        </Button>
        {activeStep !== 0 && (
          <>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
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
