import React from "react";
import { RouteComponentProps } from "react-router";

export type Route = {
	component?: React.ReactNode;
	render?: (props: RouteComponentProps<any>) => React.ReactNode;
	exact?: boolean;
	icon?: string | React.ReactNode;
	menu?: boolean;
	path?: string;
	title: string;
};

export type Routes = (Route & { subRoutes?: Route[] })[];

export type Props = {
	exact: boolean;
	path?: string;
	component?: Route["component"];
	render?: Route["render"];
};
