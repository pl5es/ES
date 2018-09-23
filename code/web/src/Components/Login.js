import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={values => console.log(values)}
        >
          <Form>
            <Field type='text' name='username' placeholder='Username' /><br />
            <Field type='password' name='password' placeholder='Password' /><br />
            <button type='submit'>Submit</button>
          </Form>
        </Formik>
      </div>
    );
  }
}
