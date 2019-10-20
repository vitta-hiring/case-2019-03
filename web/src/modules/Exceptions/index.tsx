import React from "react";

import { Props } from "./types";
import Forbidden from "./views/Forbidden";
import NotFound from "./views/NotFound";
import ServerError from "./views/ServerError";

const Exceptions: React.FC<Props> = ({ view, ...props }) => {
	switch (view) {
		case "403":
			return <Forbidden {...props} />;
		case "404":
			return <NotFound {...props} />;
		default:
			return <ServerError {...props} />;
	}
};

Exceptions.defaultProps = {
	view: "404"
};

export default Exceptions;
