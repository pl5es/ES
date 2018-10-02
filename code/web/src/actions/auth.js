import { signIn, signUp } from 'utils/api';
import { errorMessage } from 'utils/errors';

export function login(values) {
  return dispatch =>
    signIn(values)
      .then(res => {
        localStorage.setItem('access_token', res.data.access_token);
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('access_token');
    dispatch({ type: 'LOGOUT' });
  };
}

export function signup(values) {
  return dispatch =>
    signUp(values)
      .then(res => {
        dispatch({ type: 'REGISTER_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'REGISTER_ERROR', payload: errorMessage(err) });
      });
}
