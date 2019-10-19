import { LOGIN, CLEAR_FAIL, LOGOFF } from "./constants";

export const login = (payload: { email: string; password: string }) => ({
	type: LOGIN,
	payload: {
		request: {
			url: "/users",
			params: {
				email: payload.email
			}
		}
	}
});

export const logoff = () => ({
	type: LOGOFF
});

export const clearFail = () => ({
	type: CLEAR_FAIL
});
