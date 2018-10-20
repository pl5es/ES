const initState = {
  userError: null,
  user: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_MY_INFO_ERROR":
      return {
        authError: "Error at fecthing your information",
        user: null,
      };
    case "GET_MY_INFO_SUCCESS":
      return {
        authError: null,
        user: action.payload,
      };
      case "PROFILE_UPDATE_SUCCESS":
      return {
        authError: null,
        user: action.payload,
      };
      case "GET_MY_INFO_ERROR":
      return {
        ...state,
        authError: "Error at updating your information",
      };
    default:
      return state;
  }
};

export default userReducer;
