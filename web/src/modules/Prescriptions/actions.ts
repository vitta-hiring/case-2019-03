import {
	CLEAR_DOCTORS_FAIL,
	CLEAR_PATIENTS_FAIL,
	GET_DOCTORS,
	GET_PATIENTS,
	SAVE_CURRENT_CREATE,
	GET_MEDICINES
} from "./constants";
import { Payload } from "./types";

export const getDoctors = () => ({
	type: GET_DOCTORS,
	payload: {
		request: {
			url: "/doctors"
		}
	}
});

export const getPatients = () => ({
	type: GET_PATIENTS,
	payload: {
		request: {
			url: "/patients"
		}
	}
});

export const clearDoctorsFail = () => ({
	type: CLEAR_DOCTORS_FAIL
});

export const clearPatientsFail = () => ({
	type: CLEAR_PATIENTS_FAIL
});

export const saveCurrentCreate = (payload: Payload) => ({
	type: SAVE_CURRENT_CREATE,
	payload
});

export const getMedicines = (Nome_like: string) => ({
	type: GET_MEDICINES,
	payload: {
		request: {
			url: "/medicines",
			params: {
				Nome_like,
				_limit: 10
			}
		}
	}
});
