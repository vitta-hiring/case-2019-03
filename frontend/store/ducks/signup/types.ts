export enum SignUpTypes {
  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",
  VALIDATE_EMAIL_REQUEST = "VALIDATE_EMAIL_REQUEST",
  VALIDATE_EMAIL_SUCCESS = "VALIDATE_EMAIL_SUCCESS",
  VALIDATE_EMAIL_FAILURE = "VALIDATE_EMAIL_FAILURE"
}

export enum SignUpErrorTypes {
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  EMAIL_ALREADY_VALIDATED = "EMAIL_ALREADY_VALIDATED"
}

export interface SignUpPayload {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  recoveryPassToken: number;
  recoveryPassExpirationDate: string;
  emailTokenExpirationDate: string;
  emailIsVerified: false;
  role: string;
}

export interface Users {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  recoveryPassToken: number;
  recoveryPassExpirationDate: string;
  emailTokenExpirationDate: string;
  emailIsVerified: false;
  role: string;
}

export interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpState {
  readonly data: SignUpPayload;
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorType: SignUpErrorTypes;
}
