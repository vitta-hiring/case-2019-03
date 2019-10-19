import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { History } from "history";

const Forbidden: React.FC<{ history: History }> = ({
	history: { replace }
}) => {
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
