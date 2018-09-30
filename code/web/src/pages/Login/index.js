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
  <div>
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
    <button type="button" onClick={() => history.push('/register')}>
      REGISTER
    </button>
  </div>
);

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
