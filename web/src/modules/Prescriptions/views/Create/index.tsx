import React, { useEffect, useState, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Select, message } from "antd";

import {
	clearDoctorsFail,
	clearPatientsFail,
	getDoctors,
	getPatients
} from "../../actions";
import { reducers } from "../../../../store/reducers";
import { Person } from "../../types";
import { makePayload, makeErrorsFromYup } from "../../../../utils/forms";
import { selectionDoctorPatientSchema } from "../../constants";
import { usePrevious } from "../../../../utils/hooks";
import { useHistory } from "react-router";

const { Item } = Form;
const { Option } = Select;

type State = {
	errors: {
		doctor?: string;
		patient?: string;
	};
};

const Create: React.FC = () => {
	const { t: translate } = useTranslation();

	const {
		currentCreate: { doctor, patient }
	} = useSelector((state: typeof reducers) => state.prescriptions);

	const { replace } = useHistory();

	useEffect(() => {
		if (!doctor || !patient) {
			replace("/prescriptions/pre-create");
		}
	}, []);

	const [errors, setErrors] = useState<State["errors"]>({});

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setErrors({});

		if (e.target instanceof HTMLFormElement) {
			const payload = makePayload(e.target.elements);

			selectionDoctorPatientSchema
				.validate(payload, { abortEarly: false })
				.then(() => {
					console.log("dados válidos!");
				})
				.catch(err => {
					const yupErrors = makeErrorsFromYup(err);
					setErrors(yupErrors);
				});
		}
	};

	return (
		<>
			<h1>{translate("prescriptions.create.title")}</h1>
			<form onSubmit={onSubmit}>
				<Button htmlType="submit" type="primary">
					{translate("prescriptions.create.submit")}
				</Button>
			</form>
		</>
	);
};

export default Create;
