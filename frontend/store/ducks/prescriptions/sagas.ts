import { call, put, select } from "redux-saga/effects";
import axios, { AxiosRequestConfig } from "axios";
import { message, notification } from "antd";

import {
  prescriptionFetchFailure,
  prescriptionFetchSuccess,
  prescriptionDeleteSuccess,
  prescriptionDeleteFailure
} from "./actions";
import Icon from "../../../components/Icon";

const api = (url, options: AxiosRequestConfig) => {
  return axios(url, options);
};

export function* fetchPrescriptions(action) {
  const { pagination, search } = action.payload;
  const authState = yield select(state => state.auth);
  const { token } = authState.data;
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/prescription?page=${pagination.current}&limit=${pagination.pageSize}&${search.searchedColumn}=${search.searchText}`,
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
    yield put(prescriptionFetchSuccess(response));
  } catch (error) {
    yield put(prescriptionFetchFailure(error));
  }
}

export function* createPrescription(action) {
  const { selectedRecord } = action.payload;
  const key = selectedRecord.id;
  const authState = yield select(state => state.auth);
  const { token } = authState.data;
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/prescription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`
      },
      data: selectedRecord
    });
    if (response.status === 200 && response.status === 201) throw response;
    setTimeout(() => {
      notification.success({
        message: "Criado com Sucesso!",
        key,
        description: `Item ${response.data.id}`
      });
    }, 1000);
    yield put(prescriptionDeleteSuccess(selectedRecord));
  } catch (error) {
    error = error.toJSON();
    const dataError: { description: string } = JSON.parse(error.config.data);
    const message = `O registro "${dataError.description}" já existe.`;
    notification.error({
      message: "Erro ao criar!",
      key,
      description: message
    });
    yield put(prescriptionDeleteFailure({ message }));
  }
}

export function* deletePrescription(action) {
  const { selectedRecord } = action.payload;
  const key = selectedRecord.id;
  const authState = yield select(state => state.auth);
  const { token } = authState.data;
  notification.open({
    message: "Deletando",
    key,
    description: `Item ${selectedRecord.id + " - " + selectedRecord.description}...`,
    icon: Icon
  });
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/prescription/${selectedRecord.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === 200 && response.status === 201) throw response;
    setTimeout(() => {
      notification.success({
        message: "Deletado com Sucesso!",
        key,
        description: `Item ${selectedRecord.id +
          " - " +
          selectedRecord.description}...`
      });
    }, 1000);
    yield put(prescriptionDeleteSuccess(selectedRecord));
  } catch (error) {
    setTimeout(() => {
      notification.error({
        message: "Erro ao deletar!",
        key,
        description: `Item ${selectedRecord.id +
          " - " +
          selectedRecord.description}...`
      });
    }, 1000);
    yield put(prescriptionDeleteFailure(error));
  }
}
