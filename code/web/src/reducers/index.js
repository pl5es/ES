import { combineReducers } from 'redux';
import authReducer from 'reducers/auth';
import registerReducer from 'reducers/register';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});

export default rootReducer;
