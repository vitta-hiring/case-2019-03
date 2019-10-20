import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Forbidden: React.FC = () => {
	const { replace } = useHistory();
	const { t: translate } = useTranslation();

	return (
		<Result
			status="500"
			title="500"
			subTitle={translate("exceptions.500.subTitle")}
			extra={
				<Button
					href="/"
					onClick={e => {
						e.preventDefault();
						replace("/");
					}}
					type="primary"
				>
					{translate("exceptions.500.button")}
				</Button>
			}
		/>
	);
};

export default Forbidden;
