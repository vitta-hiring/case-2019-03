import React from "react";
import { Props } from "./types";
import Create from "./views/Create";
import List from "./views/List";
import PreCreate from "./views/PreCreate";

const Prescriptions: React.FC<Props> = ({ view }) => {
	const renderSubRoute = () => {
		switch (view) {
			case "create":
				return <Create />;
			case "list":
				return <List />;
			default:
				return <PreCreate />;
		}
	};

	return renderSubRoute();
};

Prescriptions.defaultProps = {
	view: "read"
};

export default Prescriptions;
