import React from 'react';
import { Formik, Field, Form } from 'formik';
import InputField from 'components/InputField';

import {signUp} from 'utils/api';

const Register = () => (
  <div>
    <Formik
      initialvalues={{
        username: '',
        name: '',
        email: '',
        ORCID: '',
        photo_url: '',
        research_area: '',
        institution: '',
        description: '',
      }}
      onSubmit={values => {
        signUp(values);
      }}
      render={({ values }) => (
        <Form>
          <h1>CREATE YOUR ACCOUNT</h1>
          <Field
            label="User Name"
            name="username"
            component={InputField}
            type="text"
          />

          <Field
            label="E-mail"
            name="email"
            component={InputField}
            type="text"
          />

          <Field
            label="ORCID Number"
            name="ORCID"
            component={InputField}
            type="text"
          />

          <Field
            label="Password"
            name="password"
            component={InputField}
            type="password"
          />

          <h2>Detailed Info</h2>
          <Field label="Name" name="name" component={InputField} type="text" />
          <Field
            label="Research Area"
            name="research_area"
            component={InputField}
            type="text"
          />

          <Field
            label="Institution"
            name="institution"
            component={InputField}
            type="text"
          />

          <Field
            label="Description"
            name="description"
            component={InputField}
            type="text"
          />

          <button type="submit">CONFIRM REGISTRATION</button>
        </Form>
      )}
    />
  </div>
);

export default Register;
