import { signUp } from 'utils/api';
import { REGISTER_SUCCESS, REGISTER_ERROR } from 'actions/types';

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
