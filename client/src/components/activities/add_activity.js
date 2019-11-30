import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as actions from "../../actions/activities";
import { useStyles } from "../auth/signin";
import {
  MyTextField,
  MySelectField,
  MyCustomDatePicker
} from "../cutom_forms_fiels";

import { Formik, Field } from "formik";

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
          <option value={value} key={displayName}>
            {displayName}
          </option>
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

  const steps = ["Choose a category", "Create your activity"];

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleClose = () => {
    closeAddActivityDialog();
    setActiveStep(0);
  };

  const handleNext = formProps => {
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
        {({ handleSubmit }) => (
          <>
            <DialogContent>
              <form onSubmit={handleSubmit}>{getStepContent(activeStep)}</form>
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
