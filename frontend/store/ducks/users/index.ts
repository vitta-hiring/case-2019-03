import { UserState, UserTypes } from "./types";
import { Reducer } from "redux";

const userInitialState: UserState = {
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

const reducer: Reducer<UserState> = (state = userInitialState, action) => {
  switch (action.type) {
    case UserTypes.USERS_FETCH:
      return {
        ...state,
        action: action.type,
        loading: true,
        pagination: action.payload.pagination,
        search: action.payload.search
      };
    
    case UserTypes.USERS_FETCH_SUCCESS:
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
    
    case UserTypes.USERS_FETCH_FAILURE:
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
