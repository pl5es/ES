const initState = {
  userError: null,
  user: null,
  updated: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_MY_INFO_ERROR':
      return {
        authError: 'Error at fecthing your information',
        user: null,
        updated: false,
      };
    case 'GET_MY_INFO_SUCCESS':
      return {
        authError: null,
        user: action.payload,
        updated: false,
      };
    case 'PROFILE_UPDATE_SUCCESS':
      return {
        authError: null,
        user: action.payload,
        updated: true,
      };
    case 'PROFILE_UPDATE_ERROR':
      return {
        ...state,
        updated: false,
        authError: 'Error at updating your information',
      };
    default:
      return state;
  }
};

export default userReducer;
