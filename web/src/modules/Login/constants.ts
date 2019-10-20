import { object, string } from "yup";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOFF = "LOGOFF";
export const CLEAR_FAIL = "CLEAR_FAIL";

export const loginSchema = object().shape({
	email: string()
		.email("login.email.validations.invalid")
		.required("login.email.validations.empty"),
	password: string().required("login.password.validations.empty")
});
