import React from "react";
// import { reduxForm, Field } from "redux-form";
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
import { useStyles } from "../auth/signin";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Formik, Field, Form, useField } from "formik";
import { TextField } from "@material-ui/core";

function AddActivity(props) {
  const {
    isActivityDialogOpen,
    errorMessage,
    auth,
    closeAddActivityDialog,
    categories
  } = props;

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  function MySelectField({ label, items, ...props }) {
    const [field, meta] = useField(props);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          {...field}
          value={field.value}
          labelWidth={labelWidth}
        >
          {items}
        </Select>
      </FormControl>
    );
  }

  function MyTextField({ label, ...props }) {
    console.log(props);

    const [field, meta] = useField(props);
    console.log(field);

    return (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        autoFocus
        {...field}
        label={label}
      />
    );
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        const categoriesItems = categories.map(category => (
          <option key={category.iconName} value={category.iconName}>
            {category.name}
          </option>
        ));
        return (
          <MySelectField
            name="category"
            type="input"
            label="Category Type"
            items={categoriesItems}
          ></MySelectField>
        );
      case 1:
        const activityTypeItems = [
          { value: "expense", displayName: "Expense" },
          { value: "income", displayName: "Income" }
        ].map(({ value, displayName }) => (
          <option value={value}>{displayName}</option>
        ));
        return (
          <>
            <MySelectField
              name="activityType"
              type="input"
              label="Activity Type"
              items={activityTypeItems}
            />
            <MyTextField name="name" type="text" label="Name" />
            <MyTextField name="amount" type="number" label="Amount" />

            {/* <MyCustomDatePicker
              id="date-picker-add-activity"
              name="date"
              placeholder="Date"
            /> */}
            <Field name="date" component={MyCustomDatePicker} />
          </>
        );
      default:
        return "Unknown step";
    }
  }

  function handleDialogState() {
    props.openAddActivityDialog();
  }

  const MyCustomDatePicker = ({ field, form, ...props }) => {
    // const [field, meta] = useField(props);
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          label={field.label}
          autoOk
          fullWidth
          inputVariant="outlined"
          value={field.value}
          onChange={date => form.setFieldValue(field.name, date, false)}
        />
      </MuiPickersUtilsProvider>
    );
  };
  const steps = ["Choose a category", "Create your activity"];

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleClose = () => {
    closeAddActivityDialog();
    setActiveStep(0);
  };

  const handleNext = formProps => {
    console.log(formProps);

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if (activeStep === 1) {
      handleClose();
      props.actionOnActivity(props.dialogTitle, formProps, auth, () => {
        props.getActivities(auth, props.globalDate);
      });
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

      <Formik
        initialValues={{
          activityType: "expense",
          date: new Date(),
          category: "fastfood",
          name: "",
          amount: ""
        }}
        onSubmit={handleNext}
      >
        {({ values, handleSubmit }) => (
          <>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                {getStepContent(activeStep)}
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </form>
              <div>{errorMessage}</div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
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
                onClick={handleSubmit}
                className={classes.button}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
    isActivityDialogOpen: state.activities.isActivityDialogOpen,
    auth: state.auth.authenticated,
    globalDate: state.activities.globalDate,
    dialogTitle: state.activities.dialogTitle,
    initialValues: state.activities.initialValues, // pull initial values
    categories: state.auth.userCategories
  };
};

export default connect(mapStateToProps, actions)(AddActivity);
