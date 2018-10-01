const initState = {
  authError: null,
  authenticated: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed',
        authenticated: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        authError: null,
        authenticated: true,
      };
    case 'LOGOUT':
      return {
        authError: null,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
