import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import InputField from 'components/InputField';

import { signIn } from 'utils/api';

const handleLogin = (values, history) => {
  signIn(values)
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        history.push('/protected');
      }
    })
    .catch(response => {
      console.log(response);
    });
};

const Login = ({ history }) => (
  <div className="container">
    <div className="row">
      <div className="col-8" />
      <div className="col-4 shadow-lg text-center rounded border border-light p-5">
        <Formik
          initialValues={{
            identifier: '',
            password: '',
            grant_type: 'password',
          }}
          onSubmit={values => {
            handleLogin(values, history);
          }}
          render={({ values }) => (
            <Form>
              <p className="h4 mb-4">Log in</p>
              <Field
                label="E-mail/ Username"
                name="identifier"
                component={InputField}
                type="text"
                className="form-control mb-4"
              />
              {/* <Field
            label="ORCID number"
            name="orcid"
            component={InputField}
            type="text"
          /> */}
              <Field
                label="Password"
                name="password"
                component={InputField}
                type="password"
                className="form-control mb-4"
              />
              <button type="submit" className="btn btn-info btn-block my-4">
                Enter
              </button>
            </Form>
          )}
        />
      </div>
    </div>
    <div className="row" style={{marginTop: "50px"}}>
      <div className="col-8" />
      <div
        className="col-4 shadow-lg rounded text-center border border-light p-5"
        style={{ backgroundColor: '#0d47a1' }}
      >
        <div className="row">
          <p className="h1 white-text">Register</p>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-blue-grey my-4"
            onClick={() => history.push('/register')}
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  </div>
);

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
