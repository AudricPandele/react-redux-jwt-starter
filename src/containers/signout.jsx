import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Signout extends Component {
  componentDidMount() {
    this.props.signoutUser();
  }
  render() {
    return <div>Tchao !</div>;
  }
}

export default connect(
  null,
  actions
)(Signout);
