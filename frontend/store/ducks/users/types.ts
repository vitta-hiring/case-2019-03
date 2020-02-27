import { PagedResponse } from "../../../utils/interfaces/interfaces";
import { PaginationConfig } from "antd/lib/table";
import { Drug } from "../drug/types";
import { Medicine } from "../medicines/types";
import { Prescription } from "../prescriptions/types";

export enum UserTypes {
  USERS_FETCH = "USERS_FETCH",
  USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS",
  USERS_FETCH_FAILURE = "USERS_FETCH_FAILURE"
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  recoveryPassToken: string;
  recoveryPassExpirationDate: string;
  email: string;
  emailIsVerified: false;
  emailToken: string;
  emailTokenExpirationDate: string;
  role: string;
  prescriptions: Prescription[];
}

export interface UserFetchPayload extends PagedResponse<User> {}
export interface UserCreatePayload extends User {}
export interface UserUpdatePayload extends User {}
export interface UserDeletePayload extends User {}

export interface UserForm {
  id: number;
  description: string;
  medicines: Medicine[];
}

export interface UserState {
  readonly data: UserFetchPayload;
  readonly pagination: PaginationConfig;
  readonly search?: { searchedColumn: string; searchText: string };
  readonly oldRecord?: User;
  readonly selectedRecord?: User;
  readonly action: UserTypes;
  readonly loading: boolean;
  readonly error: boolean;
}
