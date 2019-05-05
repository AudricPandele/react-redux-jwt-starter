import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

const FIELDS = {
  email: 'email',
  password: 'password'
};

class Signin extends Component {
  handleSubmit = credentials => {
    this.props.signinUser(credentials, this.props.history);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className='row justify-content-md-center'>
          <h1>Connexion</h1>
        </div>
        <div className='row justify-content-md-center'>
          <fieldset className='col-md-4 form-group'>
            <label className='bmd-label-floating'>Email</label>
            <Field
              component='input'
              name={FIELDS.email}
              type='text'
              className='form-control'
            />
          </fieldset>
        </div>
        <div className='row justify-content-md-center'>
          <fieldset className='col-md-4 form-group'>
            <label className='bmd-label-floating'>Password</label>
            <Field
              component='input'
              name={FIELDS.password}
              type='password'
              className='form-control'
            />
          </fieldset>
        </div>
        <div className='row justify-content-md-center'>
          <button className='btn btn-primary btn-raised' type='submit'>
            Connexion
          </button>
        </div>
      </form>
    );
  }
}

const signinForm = reduxForm({
  form: 'signin',
  fields: Object.keys(FIELDS)
})(Signin);

export default connect(
  null,
  actions
)(signinForm);
