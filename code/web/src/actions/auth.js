import axios from 'axios';
import { signUp, signIn } from 'utils/api';
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_ERROR,
} from 'actions/types';

export function signup({ email, password }) {
  return dispatch =>
    signUp
      .then(res => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        this.props.history.push('/');
      })
      .catch(err => {
        dispatch({ type: REGISTER_ERROR, payload: err });
      });
}

export function signin({ email, password }) {
  return dispatch =>
    axios
      .post(signinUrl, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.headers['x-auth']);
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
}
