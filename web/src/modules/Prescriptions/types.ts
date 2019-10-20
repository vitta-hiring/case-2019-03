import {
	CLEAR_DOCTORS_FAIL,
	GET_DOCTORS,
	GET_DOCTORS_FAIL,
	GET_DOCTORS_SUCCESS,
	CLEAR_PATIENTS_FAIL,
	GET_PATIENTS,
	GET_PATIENTS_FAIL,
	GET_PATIENTS_SUCCESS,
	SAVE_CURRENT_CREATE
} from "./constants";
import { string } from "prop-types";

export type Person = {
	id: number;
	name: string;
};

export type Payload = {
	doctor: string;
	patient: string;
};

export type Medicine = {
	id: number;
	Nome: string;
	Farmaco: null | string;
	Farmacos: string[];
	Concentracao: string;
	Unidade: string;
	TipoMedicamento: string;
	FormaFarmaceutica: string;
	ViaAdministracao: string;
	CodigoATC: string;
	UsoInterno: boolean;
	Antimicrobiano: boolean;
	Bula: null | string;
	Portaria344: string;
	ControleEspecial: boolean;
	TISS: string;
	MIP: boolean;
	Label: string;
	Unificado: null | string;
};

export type State = {
	currentCreate: {
		doctor: Person;
		patient: Person;
	};
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
			| typeof GET_PATIENTS_SUCCESS
			| typeof SAVE_CURRENT_CREATE;
		payload?: any;
	}
) => State;

export type Props = {
	view: "create" | "list" | "pre-create" | "read";
};
