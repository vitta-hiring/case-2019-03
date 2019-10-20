import produce from "immer";
import { Reducer, State } from "./types";
import {
	LOGIN,
	LOGOFF,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_FAIL
} from "./constants";

const INITIAL_STATE: State = {
	fail: null,
	loading: false,
	user: JSON.parse(localStorage.getItem("user") || "null") || null
};

const login: Reducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		switch (type) {
			case LOGIN:
				draft.loading = true;
				return;

			case LOGIN_SUCCESS:
				draft.loading = false;

				if (!payload.data.length) {
					draft.fail = "generics.problem";
					return;
				}

				// 24 hours * 60 min * 60 sec
				const expirationDate = Math.floor(Date.now() / 1000) + 86400;

				draft.user = {
					email: payload.data[0].email,
					expirationDate,
					name: payload.data[0].name
				};

				localStorage.setItem("user", JSON.stringify(draft.user));

				return;

			case LOGIN_FAIL:
				draft.loading = false;
				draft.fail =
					payload && payload.error
						? payload.error
						: "generics.problem";
				return;

			case LOGOFF:
				draft.user = null;

				localStorage.removeItem("user");

				return;

			case CLEAR_FAIL:
				draft.fail = "";
				return;
		}
	});

export default login;
