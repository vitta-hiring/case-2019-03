import React from "react";
import { Props } from "./types";
import Create from "./views/Create";
import Read from "./views/Read";
import List from "./views/List";

const Prescriptions: React.FC<Props> = ({ view }) => {
	const renderSubRoute = () => {
		switch (view) {
			case "create":
				return <Create />;
			case "list":
				return <List />;
			default:
				return <Read />;
		}
	};

	return renderSubRoute();
};

Prescriptions.defaultProps = {
	view: "read"
};

export default Prescriptions;
