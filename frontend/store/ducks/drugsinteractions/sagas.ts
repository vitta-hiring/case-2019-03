import { call, put } from "redux-saga/effects";
import Router from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import {
  drugsInteractionsFetchFailure,
  drugsInteractionsFetchSuccess,
  drugsInteractionsDeleteSuccess,
  drugsInteractionsDeleteFailure
} from "./actions";
import { message, notification } from "antd";
import Icon from "../../../components/Icon";

const api = (url, options: AxiosRequestConfig) => {
  return axios(url, options);
};

export function* fetchDrugsInteractions(action) {
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/druginteraction?page=${action.payload.pagination.current}&limit=${action.payload.pagination.pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    if (response.status === 200 && response.status === 201) throw response;
    response = yield response.data;
    yield put(drugsInteractionsFetchSuccess(response));
  } catch (error) {
    yield put(drugsInteractionsFetchFailure(error));
  }
}

export function* createDrugsInteractions(action) {
  const { selectedRecord } = action.payload;
  const key = selectedRecord.id;

  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/druginteraction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data: selectedRecord
      }
    );
    if (response.status === 200 && response.status === 201) throw response;
    setTimeout(() => {
      notification.success({
        message: "Criado com Sucesso!",
        key,
        description: `Item ${response.data.id +
          " - " +
          response.data.nome}...`
      });
    }, 1000);
    yield put(drugsInteractionsDeleteSuccess(selectedRecord));
  } catch (error) {
    error = error.toJSON();
    const dataError: {nome: string} = JSON.parse(error.config.data);
    const message = `O registro "${dataError.nome}" já existe.`
      notification.error({
        message: "Erro ao criar!",
        key,
        description: message
      });
    yield put(drugsInteractionsDeleteFailure({message}));
  }
}

export function* deleteDrugsInteractions(action) {
  const { selectedRecord } = action.payload;
  const key = selectedRecord.id;
  notification.open({
    message: "Deletando",
    key,
    description: `Item ${selectedRecord.id + " - " + selectedRecord.nome}...`,
    icon: Icon
  });
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/druginteraction/${selectedRecord.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
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
    yield put(drugsInteractionsDeleteSuccess(selectedRecord));
  } catch (error) {
    setTimeout(() => {
      notification.error({
        message: "Erro ao deletar!",
        key,
        description: `Item ${selectedRecord.id +
          " - " +
          selectedRecord.nome}...`
      });
    }, 1000);
    yield put(drugsInteractionsDeleteFailure(error));
  }
}
