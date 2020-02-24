import { call, put } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import {
  signUpSuccess,
  signUpFailure,
  validateEmailFailure,
  validateEmailSuccess,
} from './actions';

const api = (url, options) => {
  return fetch(url, options);
};

export function* signUp(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(action.payload.data),
    });
    response = yield response.json();
    if (response.status !== 200 && response.status !== 201) throw response;
    yield put(signUpSuccess(response));
    yield Router.replace(`/validate?email=${action.payload.data.email}`);
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* validateEmail(action) {
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/auth/validate/email/${action.payload.email}/${action.payload.code}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    response = yield response.json();
    if (response.error) throw response;
    yield put(validateEmailSuccess(response));
  } catch (error) {
    yield put(validateEmailFailure(error));
  }
}
