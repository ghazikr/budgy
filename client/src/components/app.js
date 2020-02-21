import React from "react";
import TopBar from "./top_bar";
import { Route, Redirect, Switch } from "react-router-dom";
import Signout from "./auth/signout";
import Signup from "./auth/singup";
import Signin from "./auth/signin";
import Activity from "./activities";
import Dashboard from "./dashboard";
import Categories from "./categories";
import PrivateRoute from "./hoc/private_route";
import { connect } from "react-redux";

const App = ({ auth }) => {
  return (
    <TopBar>
      <Switch>
        <Route exact path="/signup">
          {auth ? <Redirect to="/activity" /> : <Signup />}
        </Route>
        <Route exact path="/signout" component={Signout} />
        <Route exact path="/signin">
          {auth ? <Redirect to="/activity" /> : <Signin />}
        </Route>
        <Route exact path="/">
          <Redirect to="/activity" />
        </Route>
        <PrivateRoute path="/activity" auth={auth}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute path="/dashboard" auth={auth}>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/categories" auth={auth}>
          <Categories />
        </PrivateRoute>
      </Switch>
    </TopBar>
  );
};

const mapStateToProps = state => ({
  auth: state.auth.authenticated
});
export default connect(mapStateToProps)(App);
