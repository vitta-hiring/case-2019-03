import React from "react";
import { Link } from "react-router-dom";
import styles from "./theme/index.module.scss";
import { useTranslation } from "react-i18next";

type LogoProps = {
	className?: string;
};

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
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
