import React from 'react';
import { FieldArray, Field, Form, Formik } from 'formik';
import TagField from 'components/TagField';
import InputField from 'components/InputField';
import * as yup from 'yup';

import { signUp } from 'utils/api';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  password: yup
    .string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!'),
  name: yup.string().required('Name is required!'),
  research_area: yup.string().required('Research Area is required!'),
  institution: yup.string().required('Institution is required!'),
  orcid: yup.number().required('ORCID number is required!'),
});

const handleRegister = (values, history) => {
  signUp(values)
    .then(response => {
      if (response.status === 200) {
        history.push('/login');
      }
    })
    .catch(response => {
      console.log(response);
    });
};

const SignUp = ({ history }) => (
  <Formik
    onSubmit={values => handleRegister(values, history)}
    validationSchema={validationSchema}
    initialValues={{
      username: '',
      email: '',
      interests: '',
      orcid: '',
      name: '',
      research_area: '',
      institution: '',
      description: '',
    }}
    render={({ handleSubmit }) => (
      <div>
        <Form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <Field
            name="username"
            type="text"
            component={InputField}
            label="Username"
          />
          <Field
            name="email"
            type="text"
            component={InputField}
            label="Email"
          />
          <Field
            name="orcid"
            type="text"
            component={InputField}
            label="ORCID Number"
          />
          <Field
            name="password"
            type="password"
            component={InputField}
            label="Password"
          />

          <h1>Detailed Info</h1>
          <Field name="name" type="text" component={InputField} label="Name" />

          <Field
            name="research_area"
            type="text"
            component={InputField}
            label="Research Area"
          />

          <Field
            name="institution"
            type="text"
            component={InputField}
            label="Institution"
          />

          <Field
            name="description"
            type="text"
            component={InputField}
            label="Description"
          />

          <FieldArray
            name="interests"
            component={props => <TagField {...props} label="Interests" />}
          />
          <button>Confirm</button>
        </Form>
      </div>
    )}
  />
);

export default SignUp;
