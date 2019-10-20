import { object, string } from "yup";

export const CLEAR_DOCTORS_FAIL = "CLEAR_DOCTORS_FAIL";
export const GET_DOCTORS = "GET_DOCTORS";
export const GET_DOCTORS_SUCCESS = "GET_DOCTORS_SUCCESS";
export const GET_DOCTORS_FAIL = "GET_DOCTORS_FAIL";
export const CLEAR_PATIENTS_FAIL = "CLEAR_PATIENTS_FAIL";
export const GET_PATIENTS = "GET_PATIENTS";
export const GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS";
export const GET_PATIENTS_FAIL = "GET_PATIENTS_FAIL";

export const selectionDoctorPatientSchema = object().shape({
	doctor: string().required("prescriptions.create.validations.doctor.empty"),
	patient: string().required("prescriptions.create.validations.patient.empty")
});
