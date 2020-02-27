import { call, put, select } from "redux-saga/effects";
import axios, { AxiosRequestConfig } from "axios";
import { message, notification } from "antd";

import {
  usersFetchFailure,
  usersFetchSuccess,
} from "./actions";
import Icon from "../../../components/Icon";
import { logoutRequest } from "../auth/actions";
import { logout } from "../../../utils/auth";

const api = (url, options: AxiosRequestConfig) => {
  return axios(url, options);
};

export function* fetchUsers(action) {
  const { pagination, search } = action.payload;
  const authState = yield select(state => state.auth);
  const { token } = authState.data;
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/user?page=${pagination.current}&limit=${pagination.pageSize}&${search.searchedColumn}=${search.searchText}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === 200 && response.status === 201) throw response;
    response = yield response.data;
    yield put(usersFetchSuccess(response));
  } catch (error) {
    if (error.response.status == 401) {
      yield put(logoutRequest());
      return;
    } else {
      yield put(usersFetchFailure(error));
    }
  }
}
