import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./components/app";
import Signup from "./components/auth/singup";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import Signout from "./components/auth/signout";
import Signin from "./components/auth/signin";
import Activity from "./components/activities";
import Dashboard from "./components/dashboard";
import Categories from "./components/categories";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        {/* <Route path="/" exact component={Welcome} /> */}
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
        <Route path="/activity" component={Activity} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/categories" component={Categories} />
      </App>
    </Router>
  </Provider>,
  document.querySelector("#root")
);
