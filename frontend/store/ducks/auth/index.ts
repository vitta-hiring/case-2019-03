import { SignInState, AuthTypes } from './types';
import { Reducer } from 'redux';

const signInInitialState: SignInState = {
  data: {
    firstName: '',
    lastName: '',
    token: '',
    userEmail: '',
    userId: '',
  },
  isLogged: false,
  appIsLoading: true,
  loading: false,
  error: false,
};

const reducer: Reducer<SignInState> = (state = signInInitialState, action) => {
  switch (action.type) {
    case AuthTypes.SIGNIN_REQUEST:
      return { ...state, loading: true, data: action.payload.data };
    case AuthTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        loading: false,
        appIsLoading: false,
        error: false,
        data: action.payload.data,
      };
    case AuthTypes.SIGNIN_FAILURE:
      return {
        ...state,
        isLogged: false,
        loading: false,
        appIsLoading: false,
        error: true,
        data: {
          firstName: '',
          lastName: '',
          token: '',
          userEmail: '',
          userId: '',
        },
      };
    case AuthTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLogged: false,
        loading: false,
        appIsLoading: false,
        error: false,
        data: {
          firstName: '',
          lastName: '',
          token: '',
          userEmail: '',
          userId: '',
        },
      };
    

    default:
      return state;
  }
};

export default reducer;