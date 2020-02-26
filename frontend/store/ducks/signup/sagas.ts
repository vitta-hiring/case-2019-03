import { call, put } from "redux-saga/effects";
import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";
import {
  signUpSuccess,
  signUpFailure,
  validateEmailFailure,
  validateEmailSuccess
} from "./actions";
import { notification } from "antd";

const api = (url, options: AxiosRequestConfig) => {
  return axios(url, options);
};

export function* signUp(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      data: action.payload
    });
    if (response.status !== 200 && response.status !== 201) throw response;
    response = yield response.data;
    setTimeout(() => {
      notification.success({
        message: "Conta criada com sucesso!",
        key: response.firstName,
        description: `${response.firstName} sua conta foi criada.`
      });
    }, 1000);
    yield put(signUpSuccess(response));
    yield Router.replace(`/`);
  } catch (error) {
    notification.error({
      message: "Erro ao criar sua conta!",
      key: "registerError",
      description: `Confira seus dados pode ter algo incorreto.`
    });
    yield put(signUpFailure(error));
  }
}

export function* validateEmail(action) {
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/auth/validate/email/${action.payload.email}/${action.payload.code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    response = yield response.json();
    if (response.error) throw response;
    yield put(validateEmailSuccess(response));
  } catch (error) {
    yield put(validateEmailFailure(error));
  }
}
