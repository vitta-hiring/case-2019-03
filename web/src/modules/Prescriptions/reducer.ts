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
	GET_PATIENTS_SUCCESS,
	SAVE_CURRENT_CREATE,
	GET_DRUG_INTERACTION_SUCCESS,
	GET_DRUG_INTERACTION,
	GET_DRUG_INTERACTION_FAIL,
	CLEAR_DRUG_INTERACTION
} from "./constants";

const INITIAL_STATE: State = {
	currentCreate:
		JSON.parse(
			localStorage.getItem("current-create-prescription") || "{}"
		) || {},
	doctors: [],
	doctorsFail: null,
	doctorsLoading: false,
	patients: [],
	patientsFail: null,
	patientsLoading: false,
	drugInteractionLoading: false,
	drugInteraction: []
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

			case SAVE_CURRENT_CREATE:
				draft.currentCreate = payload;

				localStorage.setItem(
					"current-create-prescription",
					JSON.stringify(draft.currentCreate)
				);

				return;

			case GET_DRUG_INTERACTION:
				draft.drugInteractionLoading = true;
				return;

			case GET_DRUG_INTERACTION_FAIL:
				draft.drugInteractionLoading = false;
				return;

			case GET_DRUG_INTERACTION_SUCCESS:
				draft.drugInteractionLoading = false;
				draft.drugInteraction = payload.data;
				return;

			case CLEAR_DRUG_INTERACTION:
				draft.drugInteraction = [];
				return;
		}
	});

export default example;
