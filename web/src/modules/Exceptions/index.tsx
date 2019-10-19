import React from "react";
import { Props } from "./types";
import Forbidden from "./views/Forbidden";
import NotFound from "./views/NotFound";
import ServerError from "./views/ServerError";

const Exceptions: React.FC<Props> = ({ view, ...props }) => {
	const renderSubRoute = () => {
		switch (view) {
			case "403":
				return <Forbidden {...props} />;
			case "500":
				return <ServerError {...props} />;
			default:
				return <NotFound {...props} />;
		}
	};

	return renderSubRoute();
};

Exceptions.defaultProps = {
	view: "404"
};

export default Exceptions;
