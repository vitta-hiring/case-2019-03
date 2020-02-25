export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';

export enum AuthTypes {
  SIGNIN_REQUEST = 'SIGNIN_REQUEST',
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_FAILURE = 'SIGNIN_FAILURE',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
}

export interface SignInPayload {
  userId: string;
  token: string;
  userEmail: string;
  firstName: string;
  lastName: string;
}

export interface SigninForm {
  email: string;
  password: string;
}

export interface SignInState {
  readonly data: SignInPayload;
  readonly isLogged: boolean;
  readonly appIsLoading: boolean;
  readonly loading: boolean;
  readonly error: boolean;
}



// interface SignupAction {
//   type: typeof SIGNUP;
//   payload: SignupForm;
// }

// interface SigninAction {
//   type: typeof SIGNIN;
//   payload: SigninForm;
// }

// export type AuthActionTypes = SignupAction | SigninAction;
