import { PrescriptionState, PrescriptionTypes } from "./types";
import { Reducer } from "redux";

const signUpInitialState: PrescriptionState = {
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

const reducer: Reducer<PrescriptionState> = (state = signUpInitialState, action) => {
  switch (action.type) {
    case PrescriptionTypes.PRESCRIPTION_FETCH:
      return {
        ...state,
        action: action.type,
        loading: true,
        pagination: action.payload.pagination,
        search: action.payload.search
      };
    case PrescriptionTypes.PRESCRIPTION_CREATE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };
    case PrescriptionTypes.PRESCRIPTION_UPDATE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };
    case PrescriptionTypes.PRESCRIPTION_DELETE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };
    case PrescriptionTypes.PRESCRIPTION_FETCH_SUCCESS:
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
    case PrescriptionTypes.PRESCRIPTION_CREATE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };
    case PrescriptionTypes.PRESCRIPTION_UPDATE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };
    case PrescriptionTypes.PRESCRIPTION_DELETE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };
    case PrescriptionTypes.PRESCRIPTION_FETCH_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message,
      };
    case PrescriptionTypes.PRESCRIPTION_CREATE_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message,
      };
    case PrescriptionTypes.PRESCRIPTION_UPDATE_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message,
      };
    case PrescriptionTypes.PRESCRIPTION_DELETE_FAILURE:
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
