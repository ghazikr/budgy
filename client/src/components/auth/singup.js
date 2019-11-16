import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions/index";
import { compose } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { useStyles, renderTextField } from "./signin";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function Signup(props) {
  // useEffect(() => {
  //   props.history.push("/feature");
  // });

  function onSubmit(formProps) {
    props.signup(formProps, () => {
      props.history.push("/feature");
    });
  }

  const classes = useStyles();
  const { handleSubmit } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
            name="lastName"
            type="text"
            placeholder="Last Name"
            component={renderTextField}
            autoComplete="none"
          />
          <Field
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            component={renderTextField}
            autoComplete="none"
          />
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            component={renderTextField}
            autoComplete="none"
          />
          <div>{props.errorMessage}</div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
});
export default compose(
  reduxForm({ form: "signup" }),
  connect(mapStateToProps, actions)
)(Signup);
