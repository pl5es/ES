import React from 'react';
import { Formik, Field, Form } from 'formik';
import InputField from 'components/InputField';
const EditProfile = props => (
  <div>
    <Formik
      initialValues={props.values}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 300);
      }}
      render={({ values }) => (
        <Form>
          <Field
            label="User Name"
            name="name"
            component={InputField}
            type="text"
          />
          <br />
          <Field
            label="ORCID Number"
            name="orcid"
            component={InputField}
            type="text"
          />
          <br />
          <Field
            label="Research Area"
            name="research_area"
            component={InputField}
            type="text"
          />
          <br />
          <Field
            label="Institute"
            name="institute"
            component={InputField}
            type="text"
          />
          <br />
          <Field
            label="Description"
            name="bio"
            component={InputField}
            type="text"
          />
          <br />
          <button type="submit">Submit</button>
        </Form>
      )}
    />
    <button>Cancel</button>
  </div>
);
export default EditProfile;