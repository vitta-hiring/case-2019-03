import { SignUpState, SignUpTypes } from "./types";
import { Reducer } from "redux";

const signUpInitialState: SignUpState = {
  data: {
    firstName: "",
    lastName: "",
    email: "",
    recoveryPassToken: null,
    recoveryPassExpirationDate: "",
    emailTokenExpirationDate: "",
    emailIsVerified: null,
    role: ""
  },
  loading: false,
  error: false,
  errorType: null
};

const reducer: Reducer<SignUpState> = (state = signUpInitialState, action) => {
  switch (action.type) {
    case SignUpTypes.SIGNUP_REQUEST:
      return { ...state, loading: true, data: action.payload.data };
    case SignUpTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data
      };
    case SignUpTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorType: action.payload.data,
        data: action.payload.data
      };
    case SignUpTypes.VALIDATE_EMAIL_REQUEST:
      return { ...state, loading: true, data: action.payload.data };
    case SignUpTypes.VALIDATE_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data
      };
    case SignUpTypes.VALIDATE_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorType: action.payload.data.error,
        data: action.payload.data
      };

    default:
      return state;
  }
};

export default reducer;
