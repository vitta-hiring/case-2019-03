import {
	CLEAR_DOCTORS_FAIL,
	CLEAR_PATIENTS_FAIL,
	GET_DOCTORS,
	GET_PATIENTS,
	SAVE_CURRENT_CREATE,
	GET_MEDICINES,
	GET_DRUG_INTERACTION,
	CLEAR_DRUG_INTERACTION,
	CREATE_PRESCRIPTION
} from "./constants";
import { Payload, Prescription } from "./types";
import { Dispatch } from "redux";

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

export const getDrugInteraction = (drugs: string[]) => (dispatch: Dispatch) => {
	const regexDrugs = drugs.map(drug => `^${drug}$`).join("|");
	return dispatch({
		type: GET_DRUG_INTERACTION,
		payload: {
			request: {
				url: "/drug-interaction",
				params: {
					Farmaco1_like: regexDrugs,
					Farmaco2_like: regexDrugs
				}
			}
		}
	});
};

export const clearDrugInteraction = () => ({
	type: CLEAR_DRUG_INTERACTION
});

export const createPrescription = (data: Prescription) => ({
	type: CREATE_PRESCRIPTION,
	payload: {
		request: {
			data,
			method: "post",
			url: "/prescriptions"
		}
	}
});
