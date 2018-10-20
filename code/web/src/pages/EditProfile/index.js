import React, { Component } from 'react';
import { FieldArray, Field, Form, Formik } from 'formik';
import InputField from 'components/InputField';
import Navbar from 'components/Navbar';
import { connect } from 'react-redux';
import { edit } from 'actions/user';
import Dropzone from 'react-dropzone';
import { API_URL } from "utils/config";

import validationSchema from 'utils/validations';

class EditProfile extends Component {
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
      props: { user, edit },
    } = this;
    console.log(user)
    return (
      <div>
        <Navbar />
        {user && (
          <div>
            <div className="row">
              <div className="register">
                <Formik
                  onSubmit={values => edit(values)}
                  validationSchema={validationSchema}
                  initialValues={user}
                  render={({ setFieldValue }) => (
                    <div>
                      <Form>
                        <div className="row">
                          <div className="one-half column form-wrapper">
                            <Field
                              name="username"
                              type="text"
                              component={InputField}
                              label="Username *"
                              placeholder="Enter your username"
                            />
                            <Field
                              name="email"
                              type="text"
                              component={InputField}
                              label="Email *"
                              placeholder="Enter your e-mail"
                            />
                            <Field
                              name="orcid"
                              type="text"
                              component={InputField}
                              label="ORCID Number *"
                              placeholder="Enter your ORCID number"
                            />
                            <Field
                              name="password"
                              type="password"
                              component={InputField}
                              label="Password *"
                              placeholder="Enter your password"
                            />
                            <h5>Detailed Info</h5>
                            <Field
                              name="name"
                              type="text"
                              component={InputField}
                              label="Name *"
                              placeholder="Enter your name"
                            />
                            <Field
                              name="research_area"
                              type="text"
                              component={InputField}
                              label="Research Area *"
                              placeholder="Enter your subject"
                            />
                            <Field
                              name="institution"
                              type="text"
                              component={InputField}
                              label="Institution *"
                              placeholder="Enter the name of your institution"
                            />
                          </div>
                          <div className="one-half column">
                            <div className="register_image" />
                            <div className="row">
                              <Dropzone
                                accept="image/jpeg, image/png"
                                onDrop={ev => this.onDrop(setFieldValue, ev)}
                                multiple={false}
                              >
                                <div className="one-third offset-by-four column">
                                  {this.state.imageFiles.length > 0 ? (
                                    <div>
                                      {this.state.imageFiles.map(file => (
                                        <img
                                          id="avatar"
                                          src={file.preview}
                                          style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            width: '100%',
                                            height: '100%',
                                            marginTop: '-50%',
                                            marginLeft: '-50%',
                                          }}
                                        />
                                      ))}
                                    </div>
                                  ) : <img
                                          id="avatar"
                                          src={`${API_URL}/${user.avatar.url}`}
                                          style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            width: '100%',
                                            height: '100%',
                                            marginTop: '-50%',
                                            marginLeft: '-50%',
                                          }}
                                        /> }
                                </div>
                              </Dropzone>
                            </div>
                            <div id="description_container">
                              <Field
                                name="description"
                                type="textarea"
                                component={InputField}
                                label="Description"
                                style={{
                                  height: '10em',
                                  width: '30em',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="four column offset-by-four u-center-block">
                          <button type="submit">Confirm Registration</button>
                        </div>
                      </Form>
                    </div>
                  )}
                />
              </div>
            </div>
            <button>Cancel</button>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    edit: values => dispatch(edit(values)),
  };
};

const mapStateToProps = state => {
  return {
    userError: state.user.userError,
    user: state.user.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);
