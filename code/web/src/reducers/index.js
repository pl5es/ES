import { combineReducers } from 'redux';
import authReducer from 'reducers/auth';
import registerReducer from 'reducers/register';
import userReducer from 'reducers/user';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  user: userReducer,
});

export default rootReducer;
