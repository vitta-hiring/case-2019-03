import {
	LOGIN,
	LOGOFF,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_FAIL
} from "./constants";

export type State = {
	fail: string | null;
	loading: boolean;
	user: {
		email: string;
		expirationDate: number;
		name: string;
	} | null;
};

export type Reducer = (
	state: State,
	payload: {
		type:
			| typeof LOGOFF
			| typeof LOGIN
			| typeof LOGIN_SUCCESS
			| typeof LOGIN_FAIL
			| typeof CLEAR_FAIL;
		payload?: any;
	}
) => State;
