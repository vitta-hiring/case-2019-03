import { DrugsInteractionsState, DrugsInteractionsTypes } from "./types";
import { Reducer } from "redux";

const signUpInitialState: DrugsInteractionsState = {
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
    searchedColumn: "id",
    searchText: ""
  },
  oldRecord: null,
  selectedRecord: null,
  action: null,
  loading: false,
  error: false
};

const reducer: Reducer<DrugsInteractionsState> = (
  state = signUpInitialState,
  action
) => {
  switch (action.type) {
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH:
      return {
        ...state,
        action: action.type,
        loading: true,
        pagination: action.payload.pagination,
        search: action.payload.search
      };
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_UPDATE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE:
      return {
        ...state,
        action: action.type,
        loading: true,
        selectedRecord: action.payload.selectedRecord
      };

    case DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH_SUCCESS:
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
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_UPDATE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE_SUCCESS:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: false,
        oldRecord: action.payload.data,
        selectedRecord: null
      };

    case DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message
      };
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message
      };
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_UPDATE_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message
      };
    case DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE_FAILURE:
      return {
        ...state,
        action: action.type,
        loading: false,
        error: true,
        errorType: action.payload.data.message
      };

    default:
      return state;
  }
};

export default reducer;
