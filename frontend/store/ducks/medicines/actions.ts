import { action } from "typesafe-actions";

import {
  MedicineTypes,
  MedicineFetchPayload,
  MedicineCreatePayload,
  MedicineUpdatePayload,
  MedicineDeletePayload,
  MedicineForm
} from "./types";

export const medicineFetch = (data) =>
  action(MedicineTypes.MEDICINE_FETCH, { data });

export const medicineFetchSuccess = (data: MedicineFetchPayload) =>
  action(MedicineTypes.MEDICINE_FETCH_SUCCESS, { data });

export const medicineFetchFailure = (data: {
  statusCode: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}) => action(MedicineTypes.MEDICINE_FETCH_FAILURE, { data });

export const medicineCreate = (data: MedicineForm) =>
  action(MedicineTypes.MEDICINE_CREATE, { data });

export const medicineCreateSuccess = (data: MedicineCreatePayload) =>
  action(MedicineTypes.MEDICINE_CREATE_SUCCESS, { data });

export const medicineCreateFailure = (data: {
  message: string;
}) => action(MedicineTypes.MEDICINE_CREATE_FAILURE, { data });

export const medicineUpdate = (data: MedicineForm) =>
  action(MedicineTypes.MEDICINE_UPDATE, { data });

export const medicineUpdateSuccess = (data: MedicineUpdatePayload) =>
  action(MedicineTypes.MEDICINE_UPDATE_SUCCESS, { data });

export const medicineUpdateFailure = (data: {
  message: string;
}) => action(MedicineTypes.MEDICINE_UPDATE_FAILURE, { data });

export const medicineDelete = (data: MedicineForm) =>
  action(MedicineTypes.MEDICINE_DELETE, { data });

export const medicineDeleteSuccess = (data: MedicineDeletePayload) =>
  action(MedicineTypes.MEDICINE_DELETE_SUCCESS, { data });

export const medicineDeleteFailure = (data: {
  message: string;
}) => action(MedicineTypes.MEDICINE_DELETE_FAILURE, { data });


