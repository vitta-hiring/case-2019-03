import { action } from "typesafe-actions";

import {
  DrugsInteractionsTypes,
  DrugsInteractionsFetchPayload,
  DrugInteractionsCreatePayload,
  DrugInteractionsUpdatePayload,
  DrugInteractionsDeletePayload,
  DrugsInteractionsForm
} from "./types";

export const drugsInteractionsFetch = (data) =>
  action(DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH, { data });

export const drugsInteractionsFetchSuccess = (data: DrugsInteractionsFetchPayload) =>
  action(DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH_SUCCESS, { data });

export const drugsInteractionsFetchFailure = (data: {
  statusCode: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}) => action(DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH_FAILURE, { data });

export const drugsInteractionsCreate = (data: DrugsInteractionsForm) =>
  action(DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE, { data });

export const drugsInteractionsCreateSuccess = (data: DrugInteractionsCreatePayload) =>
  action(DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE_SUCCESS, { data });

export const drugsInteractionsCreateFailure = (data: {
  statusCode: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}) => action(DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE_FAILURE, { data });

export const drugsInteractionsUpdate = (data: DrugsInteractionsForm) =>
  action(DrugsInteractionsTypes.DRUG_INTERACTIONS_UPDATE, { data });

export const drugsInteractionsUpdateSuccess = (data: DrugInteractionsUpdatePayload) =>
  action(DrugsInteractionsTypes.DRUG_INTERACTIONS_UPDATE_SUCCESS, { data });

export const drugsInteractionsUpdateFailure = (data: {
  statusCode: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}) => action(DrugsInteractionsTypes.DRUG_INTERACTIONS_UPDATE_FAILURE, { data });

export const drugsInteractionsDelete = (data: DrugsInteractionsForm) =>
  action(DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE, { data });

export const drugsInteractionsDeleteSuccess = (data: DrugInteractionsDeletePayload) =>
  action(DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE_SUCCESS, { data });

export const drugsInteractionsDeleteFailure = (data: {
  message: string;
}) => action(DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE_FAILURE, { data });


