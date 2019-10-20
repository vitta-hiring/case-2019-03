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
	CLEAR_DRUG_INTERACTION,
	CREATE_PRESCRIPTION,
	CREATE_PRESCRIPTION_FAIL,
	CREATE_PRESCRIPTION_SUCCESS,
	GET_PRESCRIPTIONS,
	GET_PRESCRIPTIONS_FAIL,
	GET_PRESCRIPTIONS_SUCCESS,
	DELETE_PRESCRIPTION,
	DELETE_PRESCRIPTION_FAIL,
	DELETE_PRESCRIPTION_SUCCESS
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
	drugInteraction: [],
	createPrescriptionFail: null,
	createPrescriptionLoading: false,
	createPrescriptionSuccess: false,
	prescriptions: [],
	prescriptionsFail: null,
	prescriptionsLoading: false,
	prescriptionToRemove: null
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

			case CREATE_PRESCRIPTION:
				draft.createPrescriptionFail = null;
				draft.createPrescriptionLoading = true;
				draft.createPrescriptionSuccess = false;
				return;

			case CREATE_PRESCRIPTION_FAIL:
				draft.createPrescriptionFail = "generics.problem";
				draft.createPrescriptionLoading = false;
				return;

			case CREATE_PRESCRIPTION_SUCCESS:
				draft.createPrescriptionLoading = false;
				draft.createPrescriptionSuccess = true;
				return;

			case GET_PRESCRIPTIONS:
				draft.prescriptionsFail = null;
				draft.prescriptionsLoading = true;
				return;

			case GET_PRESCRIPTIONS_FAIL:
				draft.prescriptions = [];
				draft.prescriptionsFail = "generics.problem";
				draft.prescriptionsLoading = false;
				return;

			case GET_PRESCRIPTIONS_SUCCESS:
				draft.prescriptions = payload.data;
				draft.prescriptionsLoading = false;
				return;

			case DELETE_PRESCRIPTION:
				draft.prescriptionsFail = null;
				draft.prescriptionsLoading = true;
				draft.prescriptionToRemove = payload.data;
				return;

			case DELETE_PRESCRIPTION_FAIL:
				draft.prescriptionsFail = "generics.problem";
				draft.prescriptionsLoading = false;
				return;

			case DELETE_PRESCRIPTION_SUCCESS:
				draft.prescriptions = [
					...draft.prescriptions.slice(
						0,
						draft.prescriptionToRemove as number
					),
					...draft.prescriptions.slice(
						(draft.prescriptionToRemove as number) + 1
					)
				];
				draft.prescriptionsLoading = false;
				return;
		}
	});

export default example;
