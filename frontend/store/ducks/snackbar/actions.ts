import { SnackbarTypes } from './types';

export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;

  return {
    type: SnackbarTypes.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = key => ({
  type: SnackbarTypes.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = key => ({
  type: SnackbarTypes.REMOVE_SNACKBAR,
  key,
});
