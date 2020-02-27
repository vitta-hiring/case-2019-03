import { PagedResponse } from "../../../utils/interfaces/interfaces";
import { PaginationConfig } from "antd/lib/table";
import { Drug } from "../drug/types";

export enum MedicineTypes {
  MEDICINE_FETCH = "MEDICINE_FETCH",
  MEDICINE_FETCH_SUCCESS = "MEDICINE_FETCH_SUCCESS",
  MEDICINE_FETCH_FAILURE = "MEDICINE_FETCH_FAILURE",
  MEDICINE_CREATE = "MEDICINE_CREATE",
  MEDICINE_CREATE_SUCCESS = "MEDICINE_CREATE_SUCCESS",
  MEDICINE_CREATE_FAILURE = "MEDICINE_CREATE_FAILURE",
  MEDICINE_UPDATE = "MEDICINE_UPDATE",
  MEDICINE_UPDATE_SUCCESS = "MEDICINE_UPDATE_SUCCESS",
  MEDICINE_UPDATE_FAILURE = "MEDICINE_UPDATE_FAILURE",
  MEDICINE_DELETE = "MEDICINE_DELETE",
  MEDICINE_DELETE_SUCCESS = "MEDICINE_DELETE_SUCCESS",
  MEDICINE_DELETE_FAILURE = "MEDICINE_DELETE_FAILURE",
  MEDICINE_INTERACTION_FETCH = "MEDICINE_INTERACTION_FETCH",
  MEDICINE_INTERACTION_SUCCESS = "MEDICINE_INTERACTION_SUCCESS",
  MEDICINE_INTERACTION_FAILURE = "MEDICINE_INTERACTION_FAILURE"
}

export interface Medicine {
  id: number;
  farmaco: string;
  concentracao: string;
  unidade: string;
  tipoMedicamento: string;
  formaFarmaceutica: string;
  viaAdministracao: string;
  codigoATC: string;
  usoInterno: boolean;
  antimicrobiano: boolean;
  bula: string;
  portaria344: string;
  controleEspecial: boolean;
  TISS: string;
  MIP: boolean;
  label: string;
  unificado: string;
  farmacos: Drug[];
}

export interface MedicineInteractionPayload {
  ids: number[];
  hasDrugInteraction: boolean;
  interactions: {
    medicineName: string;
    medicineId: number;
    farmaco: {
      farmaco1Id: number;
      farmaco2Id: number;
    };
    interaction1: {
      id: number;
      nome: string;
      descricao: string;
      farmaco1: {
        id: number;
        nome: string;
      };
      farmaco2: {
        id: number;
        nome: string;
      };
      farmaco1id: number;
      farmaco2id: number;
    };
    interaction2: {
      id: number;
      nome: string;
      descricao: string;
      farmaco1: {
        id: number;
        nome: string;
      };
      farmaco2: {
        id: number;
        nome: string;
      };
      farmaco1id: number;
      farmaco2id: number;
    };
    hasDrugInteraction: boolean;
  }[];
}

export interface MedicineFetchPayload extends PagedResponse<Medicine> {}
export interface MedicineCreatePayload extends Medicine {}
export interface MedicineUpdatePayload extends Medicine {}
export interface MedicineDeletePayload extends Medicine {}

export interface MedicineForm {
  nome: string;
  farmaco: string;
  concentracao: string;
  unidade: string;
  tipoMedicamento: string;
  formaFarmaceutica: string;
  viaAdministracao: string;
  codigoATC: string;
  usoInterno: boolean;
  antimicrobiano: boolean;
  bula: string;
  portaria344: string;
  controleEspecial: boolean;
  TISS: string;
  MIP: boolean;
  label: string;
  unificado: string;
  farmacos: Drug[];
}

export interface MedicineState {
  readonly data: MedicineFetchPayload;
  readonly medicineInteractions?: MedicineInteractionPayload;
  readonly pagination: PaginationConfig;
  readonly search?: {
    searchedColumn: string;
    searchText: string | { nextTargetKeys: [] };
  };
  readonly oldRecord?: Medicine;
  readonly selectedRecord?: Medicine;
  readonly action: MedicineTypes;
  readonly loading: boolean;
  readonly error: boolean;
}
