import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { History } from "history";

const NotFound: React.FC<{ history: History }> = ({ history: { replace } }) => {
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
