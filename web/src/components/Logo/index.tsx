import React from "react";
import styles from "./theme/index.module.scss";

type LogoProps = {
	className?: string;
};

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
	return (
		<h1 className={`${styles.logo} ${className}`} title="Vitta">
			<a href="/">
				<span />
				<span>Vitta</span>
			</a>
		</h1>
	);
};

export default Logo;
