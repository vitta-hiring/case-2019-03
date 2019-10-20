import React from "react";
import { Routes } from "./types";

import Login from "../modules/Login";
import Home from "../modules/Home";
import Prescriptions from "../modules/Prescriptions";
import Exceptions from "../modules/Exceptions";

export const routes: Routes = [
	{
		component: Login,
		exact: true,
		path: "/login",
		title: "login.title"
	},
	{
		component: Home,
		exact: true,
		icon: "home",
		menu: true,
		path: "/",
		title: "title"
	},
	{
		render: props => <Prescriptions {...props} view="create" />,
		exact: true,
		path: "/pescriptions/create",
		title: "prescriptions.create.title"
	},
	{
		render: props => <Prescriptions {...props} view="pre-create" />,
		exact: true,
		icon: "plus",
		menu: true,
		path: "/pescriptions/pre-create",
		title: "prescriptions.create.title"
	},
	{
		render: props => <Prescriptions {...props} view="list" />,
		exact: true,
		icon: "unordered-list",
		menu: true,
		path: "/prescriptions",
		title: "prescriptions.list"
	},
	{
		render: props => <Exceptions {...props} view="403" />,
		exact: true,
		path: "/forbidden",
		title: "exceptions.403.title"
	},
	{
		render: props => <Exceptions {...props} view="500" />,
		exact: true,
		path: "/internal-server-error",
		title: "exceptions.500.title"
	},
	{
		render: props => <Exceptions {...props} view="404" />,
		title: "exceptions.404.title"
	}
];
