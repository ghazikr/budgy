import React from "react";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { useStyles } from "./signin";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { MyTextField } from "../cutom_forms_fiels";
import { Formik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
  email: yup.string().email(),
  password: yup.string().min(8)
});

function Signup(props) {
  function onSubmit(formProps) {
    props.signup(formProps, () => {
      props.history.push("/activity");
    });
  }

  const classes = useStyles();
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
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: ""
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <MyTextField name="name" type="text" label="Name" />
              <MyTextField name="lastName" type="text" label="Last Name" />
              <MyTextField name="email" type="text" label="Email" />
              <MyTextField name="password" type="password" label="Password" />

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
          )}
        </Formik>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
});
export default connect(mapStateToProps, actions)(Signup);
