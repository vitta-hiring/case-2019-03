import React, { SyntheticEvent, useState, useEffect } from "react";
import { Button, Form, Icon, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makePayload, makeErrorsFromYup } from "../../utils/forms";

import { reducers } from "../../store/reducers";
import { usePrevious } from "../../utils/hooks";

import { login, clearFail } from "./actions";
import { loginSchema } from "./constants";
import styles from "./theme/index.module.scss";

const { Item } = Form;
const { Password } = Input;

type State = {
	errors: {
		email?: string;
		password?: string;
	};
};

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { fail, loading, user } = useSelector(
		(state: typeof reducers) => state.login
	);
	const previousFail = usePrevious(fail);
	const [errors, setErrors] = useState<State["errors"]>({});
	const { t: translate } = useTranslation();

	useEffect(() => {
		if (user) {
			replace("/");
		}
	}, [user]);

	useEffect(() => {
		if (fail && fail.length && fail !== previousFail) {
			message.error(translate(fail));
			dispatch(clearFail());
		}
	}, [fail, previousFail]);

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		if (loading) return;

		setErrors({});

		if (e.target instanceof HTMLFormElement) {
			const payload = makePayload(e.target.elements);

			loginSchema
				.validate(payload, { abortEarly: false })
				.then(() => {
					dispatch(
						login(payload as {
							email: string;
							password: string;
						})
					);
				})
				.catch(err => {
					const yupErrors = makeErrorsFromYup(err);
					setErrors(yupErrors);
				});
		}
	};

	return (
		<form className={styles.container} onSubmit={onSubmit}>
			<Item
				htmlFor="login:email"
				label={translate("login.email.title")}
				hasFeedback
				validateStatus={errors.email ? "error" : undefined}
				help={!loading && errors.email && translate(errors.email)}
			>
				<Input
					autoComplete="username email"
					id="login:email"
					name="email"
					size="large"
					placeholder={translate("login.email.placeholder")}
					prefix={
						<Icon
							type="user"
							style={{ color: "rgba(0,0,0,.25)" }}
						/>
					}
				/>
			</Item>
			<Item
				htmlFor="login:password"
				label={translate("login.password.title")}
				hasFeedback
				validateStatus={errors.password ? "error" : undefined}
				help={!loading && errors.password && translate(errors.password)}
			>
				<Password
					autoComplete="current-password"
					id="login:password"
					name="password"
					size="large"
					placeholder={translate("login.password.placeholder")}
					prefix={
						<Icon
							type="lock"
							style={{ color: "rgba(0,0,0,.25)" }}
						/>
					}
				/>
			</Item>
			<Button htmlType="submit" type="primary" loading={loading}>
				{translate("login.title")}
			</Button>
		</form>
	);
};

export default Login;
