const resolveError = (error) => {
  let errorMessage;
  if (error.response) {
    if (error.response.data !== undefined) {
      errorMessage = error.response.data.errors || error.response.data.message;
      return errorMessage;
    }
  } else { errorMessage = 'There was an error'; }
  return errorMessage;
};

export default resolveError;
