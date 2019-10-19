import { RouteChildrenProps } from "react-router";

export type Props = RouteChildrenProps & {
	view: "403" | "404" | "500";
};
