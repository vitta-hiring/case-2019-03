import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Forbidden: React.FC = () => {
	const { replace } = useHistory();
	const { t: translate } = useTranslation();

	return (
		<Result
			status="403"
			title="403"
			subTitle={translate("exceptions.403.subTitle")}
			extra={
				<Button
					href="/"
					onClick={e => {
						e.preventDefault();
						replace("/");
					}}
					type="primary"
				>
					{translate("exceptions.403.button")}
				</Button>
			}
		/>
	);
};

export default Forbidden;
