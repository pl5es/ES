const initState = {
  registered: false,
  registerError: null,
};

const registerreducer = (state = initState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {
        registered: true,
        registerError: null,
      };
    case 'REGISTER_ERROR':
      return {
        registered: null,
        registerError: action.payload,
      };
    default:
      return state;
  }
};

export default registerreducer;
