import { PagedResponse } from "../../../utils/interfaces/interfaces";
import { PaginationConfig } from "antd/lib/table";
import { Drug } from "../drug/types";
import { Medicine } from "../medicines/types";

export enum PrescriptionTypes {
  PRESCRIPTION_FETCH = "PRESCRIPTION_FETCH",
  PRESCRIPTION_FETCH_SUCCESS = "PRESCRIPTION_FETCH_SUCCESS",
  PRESCRIPTION_FETCH_FAILURE = "PRESCRIPTION_FETCH_FAILURE",
  PRESCRIPTION_CREATE = "PRESCRIPTION_CREATE",
  PRESCRIPTION_CREATE_SUCCESS = "PRESCRIPTION_CREATE_SUCCESS",
  PRESCRIPTION_CREATE_FAILURE = "PRESCRIPTION_CREATE_FAILURE",
  PRESCRIPTION_UPDATE = "PRESCRIPTION_UPDATE",
  PRESCRIPTION_UPDATE_SUCCESS = "PRESCRIPTION_UPDATE_SUCCESS",
  PRESCRIPTION_UPDATE_FAILURE = "PRESCRIPTION_UPDATE_FAILURE",
  PRESCRIPTION_DELETE = "PRESCRIPTION_DELETE",
  PRESCRIPTION_DELETE_SUCCESS = "PRESCRIPTION_DELETE_SUCCESS",
  PRESCRIPTION_DELETE_FAILURE = "PRESCRIPTION_DELETE_FAILURE"
}

export interface Prescription {
  id: number;
  description: string;
  medicines: Medicine[];
}

export interface PrescriptionFetchPayload extends PagedResponse<Prescription> {}
export interface PrescriptionCreatePayload extends Prescription {}
export interface PrescriptionUpdatePayload extends Prescription {}
export interface PrescriptionDeletePayload extends Prescription {}

export interface PrescriptionForm {
  description: string;
  medicines: Medicine[];
}

export interface PrescriptionState {
  readonly data: PrescriptionFetchPayload;
  readonly pagination: PaginationConfig;
  readonly search?: { searchedColumn: string; searchText: string };
  readonly oldRecord?: Prescription;
  readonly selectedRecord?: Prescription;
  readonly action: PrescriptionTypes;
  readonly loading: boolean;
  readonly error: boolean;
}
