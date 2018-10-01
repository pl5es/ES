import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import InputField from 'components/InputField';
import { connect } from 'react-redux';
import { login } from 'actions/auth';

const Login = ({ history, login, authError, authenticated }) =>
  authenticated === true ? (
    <Redirect to="/profile" />
  ) : (
    <div>
      <Formik
        initialValues={{
          identifier: '',
          password: '',
          grant_type: 'password',
        }}
        onSubmit={values => {
          login(values);
        }}
        render={({ values }) => (
          <Form>
            <Field
              label="E-mail/ Username"
              name="identifier"
              component={InputField}
              type="text"
            />
            <Field
              label="Password"
              name="password"
              component={InputField}
              type="password"
            />
            <button type="submit">LOG IN</button>
          </Form>
        )}
      />
      <button type="button" onClick={() => history.push('/register')}>
        REGISTER
      </button>
      {authError ? <p>{authError}</p> : null}
    </div>
  );

const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds)),
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    authenticated: state.auth.authenticated,
  };
};

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
