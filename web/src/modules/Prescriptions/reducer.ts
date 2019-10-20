import produce from "immer";
import { Reducer, State } from "./types";
import {
	CLEAR_DOCTORS_FAIL,
	GET_DOCTORS,
	GET_DOCTORS_FAIL,
	GET_DOCTORS_SUCCESS,
	CLEAR_PATIENTS_FAIL,
	GET_PATIENTS,
	GET_PATIENTS_FAIL,
	GET_PATIENTS_SUCCESS
} from "./constants";

const INITIAL_STATE: State = {
	doctors: [],
	doctorsFail: null,
	doctorsLoading: false,
	patients: [],
	patientsFail: null,
	patientsLoading: false
};

const example: Reducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		switch (type) {
			case CLEAR_DOCTORS_FAIL:
				draft.doctorsFail = null;
				return;

			case GET_DOCTORS:
				draft.doctorsLoading = true;
				draft.doctorsFail = null;
				return;

			case GET_DOCTORS_FAIL:
				draft.doctorsLoading = false;
				draft.doctors = [];
				draft.doctorsFail = "generics.problem";
				return;

			case GET_DOCTORS_SUCCESS:
				draft.doctorsLoading = false;
				draft.doctors = payload.data;
				return;

			case CLEAR_PATIENTS_FAIL:
				draft.patientsFail = null;
				return;

			case GET_PATIENTS:
				draft.patientsLoading = true;
				draft.patientsFail = null;
				return;

			case GET_PATIENTS_FAIL:
				draft.patientsLoading = false;
				draft.patients = [];
				draft.patientsFail = "generics.problem";
				return;

			case GET_PATIENTS_SUCCESS:
				draft.patientsLoading = false;
				draft.patients = payload.data;
				return;
		}
	});

export default example;
