import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import InputField from 'components/InputField';
import { connect } from 'react-redux';
import { login } from 'actions/auth';

const Login = ({ history, login, authError, authenticated }) =>
  authenticated === true ? (
    <Redirect to="/profile" />
  ) : (
    <div>
      <body className="wrapper">
        <img id="fundo" src={require('assets/fundo1.png')} />
        <div className="container">
          <div className="row">
            <div className="eight columns">
              <img
                id="logotipo"
                src={require('assets/pando_logotipo.png')}
                alt="Pando Logo"
              />
              <header>The investigators social media</header>
              <p id="info">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                eni m ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderi t in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Exce pteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia d eserunt mollit anim id est
                laborum.
              </p>
            </div>
            <div className="four columns">
              <div className="login">
                <h2 id="log">Login</h2>
                <Formik
                  initialValues={{
                    identifier: '',
                    password: '',
                    grant_type: 'password',
                  }}
                  onSubmit={values => {
                    login(values);
                  }}
                  render={({ values }) => (
                    <Form>
                      <Field
                        label="E-mail/ Username"
                        name="identifier"
                        placeholder="E-mail / Username"
                        component={InputField}
                        type="text"
                      />
                      <Field
                        label="Password"
                        name="password"
                        placeholder="Password"
                        component={InputField}
                        type="password"
                      />
                      <button id="log-button" type="submit">
                        ENTER
                      </button>
                    </Form>
                  )}
                />
              </div>
              <div className="register_redirect">
                <h2>Register</h2>
                <button
                  id="register-button"
                  type="button"
                  onClick={() => history.push('/register')}
                >
                  CREATE NEW ACCOUNT
                </button>
              </div>
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
          <div className="row">
            <footer>
              <p>Information Contacts</p>
            </footer>
          </div>
        </div>
      </body>
    </div>
  );

const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds)),
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    authenticated: state.auth.authenticated,
  };
};

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
