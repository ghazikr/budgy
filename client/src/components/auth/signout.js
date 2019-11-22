import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
    this.props.history.push("/");
  }

  render() {
    return <div></div>;
  }
}

export default connect(null, actions)(Signout);
