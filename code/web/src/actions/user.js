import { getMyInfo, updateMyInfo } from 'utils/api';

export function edit(values) {
  return dispatch =>
    updateMyInfo(values)
      .then(res => {
        dispatch({ type: 'PROFILE_UPDATE_SUCCESS', payload: res });
      })
      .catch(err => {
        dispatch({ type: 'PROFILE_UPDATE_ERROR', err });
      });
}

export function show() {
  return dispatch =>
    getMyInfo()
      .then(res => {
        dispatch({ type: 'GET_MY_INFO_SUCCESS', payload: res.data });
      })
      .catch(err => {
        dispatch({ type: 'GET_MY_INFO_ERROR', err });
      });
}
