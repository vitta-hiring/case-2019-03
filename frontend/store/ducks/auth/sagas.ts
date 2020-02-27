import { call, put } from "redux-saga/effects";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { notification } from "antd";


import { signInSuccess, signInFailure, logoutRequest } from "./actions";
import { login, logout } from "../../../utils/auth";

const api = (url, options: AxiosRequestConfig) => {
  return axios(url, options);
};

export function* signIn(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: action.payload
    });
    if (response.status === 200 && response.status === 201) throw response;
    response = yield response.data;
    setTimeout(() => {
      notification.success({
        message: "Logado com sucesso!",
        key: "loggedInSuccessful"
      });
    }, 1000);
    yield put(signInSuccess(response));
    login(response);
  } catch (error) {
    notification.error({
      message: "Usuário ou senha incorretos!",
      key: "loggedInFailure"
    });
    yield put(signInFailure());
  }
}