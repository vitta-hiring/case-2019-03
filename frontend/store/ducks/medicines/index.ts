import { MedicineState, MedicineTypes } from "./types";
import { Reducer } from "redux";

const signUpInitialState: MedicineState = {
  data: {
    items: [],
    itemCount: 0,
    totalItems: 0,
    pageCount: 1,
    next: null,
    previous: null
  },
  pagination: {
    total: 0,
    pageSize: 5
  },
  search: {
    searchText: "",
    searchedColumn: "id"
  },
  oldRecord: null,
  selectedRecord: null,
  action: null,
  loading: false,
  error: false,
};

const reducer: Reducer<MedicineState> = (state = signUpInitialState, action) => {
  switch (action.type) {
    case MedicineTypes.MEDICINE_FETCH:
      return {
        ...state,
        action: action.type,
        loading: true,
        pagination: action.payload.pagination,
        search: action.payload.search
      };
    case MedicineTypes.MEDICINE_CREATE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };
    case MedicineTypes.MEDICINE_UPDATE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };
    case MedicineTypes.MEDICINE_DELETE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };
    case MedicineTypes.MEDICINE_FETCH_SUCCESS:
      return {
        ...state,
        action: action.type,
        pagination: {
          total: action.payload.data.totalItems
        },
        loading: false,
        error: false,
        data: action.payload.data
      };
    case MedicineTypes.MEDICINE_CREATE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };
    case MedicineTypes.MEDICINE_UPDATE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };
    case MedicineTypes.MEDICINE_DELETE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };
    case MedicineTypes.MEDICINE_FETCH_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message,
      };
    case MedicineTypes.MEDICINE_CREATE_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message,
      };
    case MedicineTypes.MEDICINE_UPDATE_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message,
      };
    case MedicineTypes.MEDICINE_DELETE_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message,
      };

    default:
      return state;
  }
};

export default reducer;
