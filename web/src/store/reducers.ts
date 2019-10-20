import { combineReducers } from "redux";

// @ts-ignore
const context = require.context("../", true, /reducer\.tsx?/);

export const reducers: { [key: string]: any } = context.keys().reduce(
	(result: {}, current: string) => ({
		...result,
		[current
			.split("/")
			.slice(-2)[0]
			.toLowerCase()]: context(current).default
	}),
	{}
);

export default combineReducers(reducers);
