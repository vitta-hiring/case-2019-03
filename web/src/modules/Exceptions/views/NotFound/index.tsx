import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const NotFound: React.FC = () => {
	const { replace } = useHistory();
	const { t: translate } = useTranslation();

	return (
		<Result
			status="404"
			title="404"
			subTitle={translate("exceptions.404.subTitle")}
			extra={
				<Button
					href="/"
					onClick={e => {
						e.preventDefault();
						replace("/");
					}}
					type="primary"
				>
					{translate("exceptions.404.button")}
				</Button>
			}
		/>
	);
};

export default NotFound;
