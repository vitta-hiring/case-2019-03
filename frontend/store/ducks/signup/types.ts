export enum SignUpTypes {
  SIGNUP_REQUEST = 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE = 'SIGNUP_FAILURE',
  VALIDATE_EMAIL_REQUEST = 'VALIDATE_EMAIL_REQUEST',
  VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS',
  VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE',
}

export enum SignUpErrorTypes {
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  EMAIL_ALREADY_VALIDATED = 'EMAIL_ALREADY_VALIDATED',
}

export interface SignUpPayload {
  id?: string;
  email: string;
  tags?: [];
  emailToken?: string;
  lastName: string;
  firstName: string;
  emailTokenExpirationDate?: string;
  notes?: [];
  emailIsVerified?: boolean;
  googleId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Users {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  emailIsVerified: boolean;
  emailToken?: string;
  emailTokenExpirationDate?: string;
  googleId?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: {
    id: string;
    name: string;
    notes: {
      id: string;
      title: string;
      content: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  notes?: {
    id: string;
    title: string;
    content: string;
    tags: {
      id: string;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  };
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
