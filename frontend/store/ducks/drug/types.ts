import { PagedResponse } from "../../../utils/interfaces/interfaces";
import { PaginationConfig } from "antd/lib/table";

export enum DrugTypes {
  DRUG_FETCH = "DRUG_FETCH",
  DRUG_FETCH_SUCCESS = "DRUG_FETCH_SUCCESS",
  DRUG_FETCH_FAILURE = "DRUG_FETCH_FAILURE",
  DRUG_CREATE = "DRUG_CREATE",
  DRUG_CREATE_SUCCESS = "DRUG_CREATE_SUCCESS",
  DRUG_CREATE_FAILURE = "DRUG_CREATE_FAILURE",
  DRUG_UPDATE = "DRUG_UPDATE",
  DRUG_UPDATE_SUCCESS = "DRUG_UPDATE_SUCCESS",
  DRUG_UPDATE_FAILURE = "DRUG_UPDATE_FAILURE",
  DRUG_DELETE = "DRUG_DELETE",
  DRUG_DELETE_SUCCESS = "DRUG_DELETE_SUCCESS",
  DRUG_DELETE_FAILURE = "DRUG_DELETE_FAILURE"
}

export enum SignUpErrorTypes {
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  EMAIL_ALREADY_VALIDATED = "EMAIL_ALREADY_VALIDATED"
}

export interface Drug {
  id: number;
  nome: string;
}

export interface DrugFetchPayload extends PagedResponse<Drug> {}
export interface DrugCreatePayload extends Drug {}
export interface DrugUpdatePayload extends Drug {}
export interface DrugDeletePayload extends Drug {}

export interface DrugForm {
  nome: string
}

export interface DrugState {
  readonly data: DrugFetchPayload;
  readonly pagination: PaginationConfig;
  readonly search?: { searchedColumn: string, searchText: string};
  readonly oldRecord?: Drug;
  readonly selectedRecord?: Drug;
  readonly action: DrugTypes;
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorType: SignUpErrorTypes;
}
