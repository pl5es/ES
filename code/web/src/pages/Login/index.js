import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import InputField from 'components/InputField';
import Register from 'pages/Register';

import { signIn } from 'utils/api';

const handleLogin = values => {
  signIn(values)
    .then(response => {
      response.status == 200 && alert('logged in');
    })
    .catch(response => {
      console.log(response);
    });
};

const Login = () => (
  <div>
    <Formik
      initialValues={{
        identifier: '',
        password: '',
        grant_type: 'password',
      }}
      onSubmit={values => {
        handleLogin(values);
      }}
      render={({ values }) => (
        <Form>
          <Field
            label="E-mail/ Username"
            name="identifier"
            component={InputField}
            type="text"
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
          />
          <button type="submit">LOG IN</button>
        </Form>
      )}
    />
  </div>
);

export default Login;
