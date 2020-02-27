export const CUSTOM_HTTP_ERRORS = {
    CREATED_NOT_PHONE_NUMBER: {
      error: 'CREATED_NO_PHONE_NUMBER',
      message: 'User created but he has no phone.',
    },
    CREATED_EMAIL_PHONE_NOT_VALIDATED: {
      error: 'CREATED_EMAIL_PHONE_NOT_VALIDATED',
      message: 'User created but his email and phone has not been validated.',
    },
    TOKEN_INVALID: {
      error: 'TOKEN_INVALID',
      message: 'Token is invalid.',
    },
    NOT_FOUND: {
      error: 'NOT_FOUND',
      message: 'Register not found.',
    },
    EMAIL_ALREADY_VALIDATED: {
      error: 'EMAIL_ALREADY_VALIDATED',
      message: 'Email is already validated.',
    },
    TOKEN_EXPIRED: {
      error: 'TOKEN_EXPIRED',
      message: 'Token is expired.',
    },
    INVALID_CREDENTIALS: {
      error: 'INVALID_CREDENTIALS',
      message: 'Login or password is invalid.',
    },
    SIGN_WITH_SOCIAL_WITHOUT_PASSWORD: {
      error: 'SIGN_WITH_SOCIAL_WITHOUT_PASSWORD',
      message: 'You signed up with social media and you don\'t have a configurated password. Please sign in with your social media.',
    },
    UNAUTHORIZED: {
      error: 'UNAUTHORIZED',
      message: 'User not authorized.',
    },
    EMAIL_NOT_VALIDATED: {
      error: 'EMAIL_NOT_VALIDATED',
      message: "The User's email has not been validated.",
    },
    PHONE_NOT_VALIDATED: {
      error: 'PHONE_NOT_VALIDATED',
      message: "The User's phone has not been validated.",
    },
    USER_REGISTERED: {
      error: 'USER_REGISTERED',
      message: "You are already registered.",
    },
    OBJECT_INVALID: {
      error: 'OBJECT_INVALID',
      message: "Object invalid.",
    }
  };
  
  export class CustomErrors {
    static notFound(value): { error: string; message: string } {
      return {
        error: CUSTOM_HTTP_ERRORS.NOT_FOUND.error,
        message: `The ${value} not found.`,
      };
    }
  }