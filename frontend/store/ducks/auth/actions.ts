import { action } from 'typesafe-actions';
import {
  SigninForm,
  AuthTypes,
  SignInPayload,
} from './types';

// export function signup(signupForm: SignupForm): AuthActionTypes {
//   return {
//     type: SIGNUP,
//     payload: signupForm,
//   };
// }

// export function signin(signinForm: SigninForm): AuthActionTypes {
//   return {
//     type: SIGNIN,
//     payload: signinForm,
//   };
// }

export const signInRequest = (data: SigninForm) =>
  action(AuthTypes.SIGNIN_REQUEST, { data });

export const signInSuccess = (data: SignInPayload) =>
  action(AuthTypes.SIGNIN_SUCCESS, { data });
  
export const signInFailure = () => action(AuthTypes.SIGNIN_FAILURE);
