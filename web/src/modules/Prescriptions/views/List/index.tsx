import React from "react";
import { useTranslation } from "react-i18next";

const List: React.FC = () => {
	const { t: translate } = useTranslation();

	return <p>{translate("prescriptions.list")}</p>;
};

export default List;
