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
	GET_DRUG_INTERACTION,
	GET_DRUG_INTERACTION_FAIL,
	GET_DRUG_INTERACTION_SUCCESS,
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

export type MedicinePrescription = {
	medicine?: Medicine;
	dosage: string;
	administrationRoute: Medicine["ViaAdministracao"];
};

export type DrugInteraction = {
	Descricao: string;
	Farmaco1: Medicine["Farmacos"][0];
	Farmaco2: Medicine["Farmacos"][0];
	Nome: "Leve" | "Moderada" | "Grave";
};

export type Prescription = {
	date: number;
	id?: number;
	doctor: Person;
	patient: Person;
	medicines: MedicinePrescription[];
	drugInteraction: DrugInteraction[];
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
	drugInteractionLoading: boolean;
	drugInteraction: DrugInteraction[];
	createPrescriptionFail: string | null;
	createPrescriptionLoading: boolean;
	createPrescriptionSuccess: boolean;
	prescriptions: Prescription[];
	prescriptionsFail: string | null;
	prescriptionsLoading: boolean;
	prescriptionToRemove: number | null;
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
			| typeof SAVE_CURRENT_CREATE
			| typeof GET_DRUG_INTERACTION
			| typeof GET_DRUG_INTERACTION_FAIL
			| typeof GET_DRUG_INTERACTION_SUCCESS
			| typeof CLEAR_DRUG_INTERACTION
			| typeof CREATE_PRESCRIPTION
			| typeof CREATE_PRESCRIPTION_FAIL
			| typeof CREATE_PRESCRIPTION_SUCCESS
			| typeof GET_PRESCRIPTIONS
			| typeof GET_PRESCRIPTIONS_FAIL
			| typeof GET_PRESCRIPTIONS_SUCCESS
			| typeof DELETE_PRESCRIPTION
			| typeof DELETE_PRESCRIPTION_FAIL
			| typeof DELETE_PRESCRIPTION_SUCCESS;
		payload?: any;
	}
) => State;

export type Props = {
	view: "create" | "list" | "pre-create" | "read";
};
