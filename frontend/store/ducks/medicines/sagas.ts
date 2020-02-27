import { call, put, select } from "redux-saga/effects";
import Router from "next/router";
import axios, { AxiosRequestConfig } from "axios";

import {
  medicineFetchFailure,
  medicineFetchSuccess,
  medicineDeleteSuccess,
  medicineDeleteFailure,
  medicineInteractionSuccess,
  medicineInteractionFailure
} from "./actions";
import { message, notification } from "antd";
import Icon from "../../../components/Icon";
import { logoutRequest } from "../auth/actions";

const api = (url, options: AxiosRequestConfig) => {
  return axios(url, options);
};

export function* fetchMedicines(action) {
  const { pagination, search } = action.payload;
  const authState = yield select(state => state.auth);
  const { token } = authState.data;

  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/medicine?page=${pagination.current}&limit=${pagination.pageSize}&${search.searchedColumn}=${search.searchText}`,
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
    yield put(medicineFetchSuccess(response));
  } catch (error) {
    if (error.response.status == 401) {
      yield put(logoutRequest());
      return;
    } else {
      yield put(medicineFetchFailure(error));
    }
  }
}

export function* fetchMedicineInteractions(action) {
  const { nextTargetKeys, targetKeys } = action.payload.search.searchText;
  let ids: any = JSON.stringify([...nextTargetKeys]);
  const authState = yield select(state => state.auth);
  const { token } = authState.data;

  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/medicine/interactions?ids=${ids}`,
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
    yield put(medicineInteractionSuccess(response));
  } catch (error) {
    if (error.response.status == 401) {
      yield put(logoutRequest());
      return;
    } else {
      yield put(medicineInteractionFailure(error));
    }
  }
}

export function* createMedicine(action) {
  const { selectedRecord } = action.payload;
  const key = selectedRecord.id;
  const authState = yield select(state => state.auth);
  const { token } = authState.data;

  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/medicine`, {
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
        description: `Item ${response.data.id + " - " + response.data.nome}...`
      });
    }, 1000);
    yield put(medicineDeleteSuccess(selectedRecord));
  } catch (error) {
    if (error.response.status == 401) {
      yield put(logoutRequest());
      return;
    } else {
      error = error.toJSON();
      const dataError: { nome: string } = JSON.parse(error.config.data);
      const message = `O registro "${dataError.nome}" já existe.`;
      notification.error({
        message: "Erro ao criar!",
        key,
        description: message
      });
      yield put(medicineDeleteFailure({ message }));
    }
  }
}

export function* deleteMedicine(action) {
  const { selectedRecord } = action.payload;
  const key = selectedRecord.id;
  const authState = yield select(state => state.auth);
  const { token } = authState.data;
  notification.open({
    message: "Deletando",
    key,
    description: `Item ${selectedRecord.id + " - " + selectedRecord.nome}...`,
    icon: Icon
  });
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/medicine/${selectedRecord.id}`,
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
          selectedRecord.nome}...`
      });
    }, 1000);
    yield put(medicineDeleteSuccess(selectedRecord));
  } catch (error) {
    if (error.response.status == 401) {
      yield put(logoutRequest());
      return;
    } else {
      setTimeout(() => {
        notification.error({
          message: "Erro ao deletar!",
          key,
          description: `Item ${selectedRecord.id +
            " - " +
            selectedRecord.nome}...`
        });
      }, 1000);
      yield put(medicineDeleteFailure(error));
    }
  }
}
