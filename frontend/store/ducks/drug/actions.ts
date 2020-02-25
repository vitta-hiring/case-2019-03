import { action } from "typesafe-actions";

import {
  DrugTypes,
  DrugFetchPayload,
  DrugCreatePayload,
  DrugUpdatePayload,
  DrugDeletePayload,
  DrugForm
} from "./types";

export const drugFetch = (data) =>
  action(DrugTypes.DRUG_FETCH, { data });

export const drugFetchSuccess = (data: DrugFetchPayload) =>
  action(DrugTypes.DRUG_FETCH_SUCCESS, { data });

export const drugFetchFailure = (data: {
  statusCode: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}) => action(DrugTypes.DRUG_FETCH_FAILURE, { data });

export const drugCreate = (data: DrugForm) =>
  action(DrugTypes.DRUG_CREATE, { data });

export const drugCreateSuccess = (data: DrugCreatePayload) =>
  action(DrugTypes.DRUG_CREATE_SUCCESS, { data });

export const drugCreateFailure = (data: {
  statusCode: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}) => action(DrugTypes.DRUG_CREATE_FAILURE, { data });

export const drugUpdate = (data: DrugForm) =>
  action(DrugTypes.DRUG_UPDATE, { data });

export const drugUpdateSuccess = (data: DrugUpdatePayload) =>
  action(DrugTypes.DRUG_UPDATE_SUCCESS, { data });

export const drugUpdateFailure = (data: {
  statusCode: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}) => action(DrugTypes.DRUG_UPDATE_FAILURE, { data });

export const drugDelete = (data: DrugForm) =>
  action(DrugTypes.DRUG_DELETE, { data });

export const drugDeleteSuccess = (data: DrugDeletePayload) =>
  action(DrugTypes.DRUG_DELETE_SUCCESS, { data });

export const drugDeleteFailure = (data: {
  message: string;
}) => action(DrugTypes.DRUG_DELETE_FAILURE, { data });


