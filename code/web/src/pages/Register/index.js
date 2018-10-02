import React, { Component } from 'react';
import { FieldArray, Field, Form, Formik } from 'formik';
import Dropzone from 'react-dropzone';
import TagField from 'components/TagField';
import InputField from 'components/InputField';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { signup } from 'actions/auth';
import { Redirect } from 'react-router-dom';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required!'),
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
  orcid: yup
    .number()
    .typeError('ORCID number must be a number!')
    .required('ORCID number is required!'),
});

class SignUp extends Component {
  state = {
    imageFiles: [],
  };

  onDrop = (setFieldValue, imageFiles) => {
    this.setState({
      imageFiles: imageFiles,
    });
    setFieldValue('avatar', this.state.imageFiles[0]);
  };

  valuesToFormData(values, history, signup) {
    const bodyFormData = new FormData();
    Object.keys(values).map(value => {
      if (value !== 'interests') {
        bodyFormData.append(value, values[value]);
      }
    });

    for (var i = 0; i < values.interests.length; i++) {
      bodyFormData.append('interests[]', values.interests[i]);
    }

    signup(bodyFormData, history);
  }

  render() {
    const {
      props: { history, signup, registerError, registered },
    } = this;
    console.log(this.props);
    return (
      <div>
        {registered === true ? (
          <Redirect to="/profile" />
        ) : (
          <div>
            <body className="wrapper">
              <div className="container">
                <div className="row">
                  <img href="" />
                  <h1>Create Your Account</h1>
                  <h5>All fields with a * must be filled out</h5>
                </div>
                <div className="row">
                  <div className="register">
                    <Formik
                      onSubmit={values =>
                        this.valuesToFormData(values, history, signup)
                      }
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
                        avatar: '',
                      }}
                      render={({ setFieldValue }) => (
                        <div>
                          <Form>
                            <div className="row">
                              <div className="six columns">
                                {}
                                <h1>Register</h1>
                                <Field
                                  name="username"
                                  type="text"
                                  component={InputField}
                                  label="Username *"
                                />
                                <Field
                                  name="email"
                                  type="text"
                                  component={InputField}
                                  label="Email *"
                                />
                                <Field
                                  name="orcid"
                                  type="text"
                                  component={InputField}
                                  label="ORCID Number *"
                                />
                                <Field
                                  name="password"
                                  type="password"
                                  component={InputField}
                                  label="Password *"
                                />

                                <label>Avatar</label>

                                <Dropzone
                                  onDrop={ev => this.onDrop(setFieldValue, ev)}
                                  multiple={false}
                                >
                                  <div>
                                    {this.state.imageFiles.length > 0 && (
                                      <div>
                                        <div>
                                          {this.state.imageFiles.map(file => (
                                            <img
                                              id="avatar"
                                              src={file.preview}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </Dropzone>

                                <h3>Detailed Info</h3>
                                <Field
                                  name="name"
                                  type="text"
                                  component={InputField}
                                  label="Name *"
                                />

                                <Field
                                  name="research_area"
                                  type="text"
                                  component={InputField}
                                  label="Research Area *"
                                />

                                <Field
                                  name="institution"
                                  type="text"
                                  component={InputField}
                                  label="Institution *"
                                />
                                <Field
                                  name="description"
                                  type="text"
                                  component={InputField}
                                  label="Description"
                                />

                                <FieldArray
                                  name="interests"
                                  component={props => (
                                    <TagField {...props} label="Interests" />
                                  )}
                                />
                                {registerError ? <p>{registerError}</p> : null}
                                <button type="submit">Confirm</button>
                              </div>
                            </div>
                          </Form>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </body>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: creds => dispatch(signup(creds)),
  };
};

const mapStateToProps = state => {
  return {
    registered: state.register.registered,
    registerError: state.register.registerError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
