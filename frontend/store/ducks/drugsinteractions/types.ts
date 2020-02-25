import { PagedResponse } from "../../../utils/interfaces/interfaces";
import { PaginationConfig } from "antd/lib/table";

export enum DrugsInteractionsTypes {
  DRUG_INTERACTIONS_FETCH = "DRUG_INTERACTIONS_FETCH",
  DRUG_INTERACTIONS_FETCH_SUCCESS = "DRUG_INTERACTIONS_FETCH_SUCCESS",
  DRUG_INTERACTIONS_FETCH_FAILURE = "DRUG_INTERACTIONS_FETCH_FAILURE",
  DRUG_INTERACTIONS_CREATE = "DRUG_INTERACTIONS_CREATE",
  DRUG_INTERACTIONS_CREATE_SUCCESS = "DRUG_INTERACTIONS_CREATE_SUCCESS",
  DRUG_INTERACTIONS_CREATE_FAILURE = "DRUG_INTERACTIONS_CREATE_FAILURE",
  DRUG_INTERACTIONS_UPDATE = "DRUG_INTERACTIONS_UPDATE",
  DRUG_INTERACTIONS_UPDATE_SUCCESS = "DRUG_INTERACTIONS_UPDATE_SUCCESS",
  DRUG_INTERACTIONS_UPDATE_FAILURE = "DRUG_INTERACTIONS_UPDATE_FAILURE",
  DRUG_INTERACTIONS_DELETE = "DRUG_INTERACTIONS_DELETE",
  DRUG_INTERACTIONS_DELETE_SUCCESS = "DRUG_INTERACTIONS_DELETE_SUCCESS",
  DRUG_INTERACTIONS_DELETE_FAILURE = "DRUG_INTERACTIONS_DELETE_FAILURE"
}

export interface DrugsInteractions {
  id: number;
  nome: string;
  descricao: string;
  farmaco1: string;
  farmaco2: string;
}

export interface DrugsInteractionsFetchPayload extends PagedResponse<DrugsInteractions> {}
export interface DrugInteractionsCreatePayload extends DrugsInteractions {}
export interface DrugInteractionsUpdatePayload extends DrugsInteractions {}
export interface DrugInteractionsDeletePayload extends DrugsInteractions {}

export interface DrugsInteractionsForm {
  nome: string;
  descricao?: string;
  farmaco1: string;
  farmaco2: string;
}

export interface DrugsInteractionsState {
  readonly data: DrugsInteractionsFetchPayload;
  readonly pagination: PaginationConfig;
  readonly search?: { searchedColumn: string, searchText: string};
  readonly oldRecord?: DrugsInteractions;
  readonly selectedRecord?: DrugsInteractions;
  readonly action: DrugsInteractionsTypes;
  readonly loading: boolean;
  readonly error: boolean;
}
