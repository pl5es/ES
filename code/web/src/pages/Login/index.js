import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import InputField from 'components/InputField';
import Register from 'pages/Register';

const Login = () => (
  <div>
    <Formik
      initialValues={{
        email: '',
        orcid: '',
        password: '',
      }}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 300);
      }}
      render={({ values }) => (
        <Form>
          <Field
            label="E-mail"
            name="email"
            component={InputField}
            type="text"
          />
          <Field
            label="ORCID number"
            name="orcid"
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
    <Register />
  </div>
);

export default Login;
