export const errorMessage = err => {
  if (!err.response) {
    return err.message;
  } else {
    const errors = err.response.data;
    return JSON.stringify(errors);
  }
};
