import { call, put } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';

import { signInSuccess, signInFailure } from './actions';
import { login } from '../../../utils/auth';

const api = (url, options) => {
  return fetch(url, options);
};

export function* signIn(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: action.payload.email,
        password: action.payload.password,
      }),
    });
    response = yield response.json();
    yield put(signInSuccess(response));
    login(response);
  } catch (error) {
    yield put(signInFailure());
  }
}

