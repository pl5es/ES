import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import InputField from 'components/InputField';
import { connect } from 'react-redux';
import { login } from 'actions/auth';
import TwitterButton from 'components/TwitterButton';

const Login = ({ history, login, authError, authenticated }) =>
  authenticated === true ? (
    <Redirect to="/profile" />
  ) : (
    <div className="container">
      <div className="row container-title-login">
        <div className="col-md-8 title-area">
          <div className="logo" />
          <div className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            necessitatibus suscipit impedit sint doloremque explicabo ad
            possimus aut iste quam laboriosam nostrum ducimus dolorem vel nemo
            voluptates. Officia, recusandae minus quae delectus obcaecati
            dolorem alias incidunt quia sint, hic qui in dicta nam voluptatibus
            ducimus dolor odit tempore? Vero adipisci rerum tempora autem magni.
            Aliquam repellendus consectetur eos facere ipsa?
          </div>
        </div>
        <div className="col-md-4 login-area ">
          <div className="login">
            <div className="title">LOG IN</div>
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
          <div className="register">
            <div className="title">REGISTER</div>
            <button
              id="register-button"
              type="button"
              onClick={() => history.push('/register')}
            >
              CREATE NEW ACCOUNT
            </button>
          </div>
          {authError ? <p>{authError}</p> : null}
          <TwitterButton login={login} />
        </div>
      </div>
      <div className="footer" id="footer-login">
        <div className="container">
          <div>Information</div>
          <div>Contacts</div>
        </div>
      </div>
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
