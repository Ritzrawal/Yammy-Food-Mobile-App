
export const isObject = (arg) => {
  if ((typeof arg === 'object' || typeof arg === 'function') && arg !== null) {
    return true;
  }
  return false;
};

export const withError = (arg) => {
  if (isObject(arg)) {
    const {message = '', ...rest} = arg;
    return {
      data: null,
      error: {
        status: true,
        message,
        ...rest,
      },
    };
  }
  return {
    data: null,
    error: {
      status: true,
      message: arg,
    },
  };
};

export const withData = (data) => ({
  error: false,
  data,
});

export const serialize = (data) => {
  return JSON.stringify(data);
};

export const parse = (data) => {
  try {
    const parsedData = JSON.parse(data);

    return withData(parsedData);
  } catch (error) {
    return withError(error);
  }
};




