import { action } from "typesafe-actions";

import {
  PrescriptionTypes,
  PrescriptionFetchPayload,
  PrescriptionCreatePayload,
  PrescriptionUpdatePayload,
  PrescriptionDeletePayload,
  PrescriptionForm
} from "./types";

export const prescriptionFetch = (data) =>
  action(PrescriptionTypes.PRESCRIPTION_FETCH, { data });

export const prescriptionFetchSuccess = (data: PrescriptionFetchPayload) =>
  action(PrescriptionTypes.PRESCRIPTION_FETCH_SUCCESS, { data });

export const prescriptionFetchFailure = (data: {
  message: string;
}) => action(PrescriptionTypes.PRESCRIPTION_FETCH_FAILURE, { data });

export const prescriptionCreate = (data: PrescriptionForm) =>
  action(PrescriptionTypes.PRESCRIPTION_CREATE, { data });

export const prescriptionCreateSuccess = (data: PrescriptionCreatePayload) =>
  action(PrescriptionTypes.PRESCRIPTION_CREATE_SUCCESS, { data });

export const prescriptionCreateFailure = (data: {
  message: string;
}) => action(PrescriptionTypes.PRESCRIPTION_CREATE_FAILURE, { data });

export const prescriptionUpdate = (data: PrescriptionForm) =>
  action(PrescriptionTypes.PRESCRIPTION_UPDATE, { data });

export const prescriptionUpdateSuccess = (data: PrescriptionUpdatePayload) =>
  action(PrescriptionTypes.PRESCRIPTION_UPDATE_SUCCESS, { data });

export const prescriptionUpdateFailure = (data: {
  message: string;
}) => action(PrescriptionTypes.PRESCRIPTION_UPDATE_FAILURE, { data });

export const prescriptionDelete = (data: PrescriptionForm) =>
  action(PrescriptionTypes.PRESCRIPTION_DELETE, { data });

export const prescriptionDeleteSuccess = (data: PrescriptionDeletePayload) =>
  action(PrescriptionTypes.PRESCRIPTION_DELETE_SUCCESS, { data });

export const prescriptionDeleteFailure = (data: {
  message: string;
}) => action(PrescriptionTypes.PRESCRIPTION_DELETE_FAILURE, { data });


