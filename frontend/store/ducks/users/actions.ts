import { action } from "typesafe-actions";

import { UserTypes, UserFetchPayload } from "./types";

export const usersFetch = data =>
  action(UserTypes.USERS_FETCH, { data });

export const usersFetchSuccess = (data: UserFetchPayload) =>
  action(UserTypes.USERS_FETCH_SUCCESS, { data });

export const usersFetchFailure = (data: { message: string }) =>
  action(UserTypes.USERS_FETCH_FAILURE, { data });
