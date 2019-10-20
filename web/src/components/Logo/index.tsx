import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./theme/index.module.scss";

type Props = {
	className?: string;
};

const Logo: React.FC<Props> = ({ className = "" }) => {
	const { t: translate } = useTranslation();

	return (
		<h1 className={`${styles.logo} ${className}`} title="Vitta">
			<Link to="/">
				<span />
				<span>{translate("minititle")}</span>
			</Link>
		</h1>
	);
};

export default Logo;
