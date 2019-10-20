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

export type Person = {
	id: number;
	name: string;
};

export type State = {
	doctors: Person[];
	doctorsFail: string | null;
	doctorsLoading: boolean;
	patients: Person[];
	patientsFail: string | null;
	patientsLoading: boolean;
};

export type Reducer = (
	state: State,
	payload: {
		type:
			| typeof CLEAR_DOCTORS_FAIL
			| typeof GET_DOCTORS
			| typeof GET_DOCTORS_FAIL
			| typeof GET_DOCTORS_SUCCESS
			| typeof CLEAR_PATIENTS_FAIL
			| typeof GET_PATIENTS
			| typeof GET_PATIENTS_FAIL
			| typeof GET_PATIENTS_SUCCESS;
		payload: any;
	}
) => State;

export type Props = {
	view: "create" | "list" | "pre-create" | "read";
};
