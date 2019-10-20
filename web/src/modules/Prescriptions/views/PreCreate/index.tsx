import React, { useState, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

import { makePayload, makeErrorsFromYup } from "../../../../utils/forms";
import { selectionDoctorPatientSchema } from "../../constants";
import Doctors from "./components/Doctors";
import Patients from "./components/Patients";
import { useDispatch } from "react-redux";
import { saveCurrentCreate } from "../../actions";
import { Payload } from "../../types";
import { useHistory } from "react-router";

type State = {
	errors: {
		doctor?: string;
		patient?: string;
	};
};

const PreCreate: React.FC = () => {
	const { t: translate } = useTranslation();

	const [errors, setErrors] = useState<State["errors"]>({});

	const dispatch = useDispatch();

	const { push } = useHistory();

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setErrors({});

		if (e.target instanceof HTMLFormElement) {
			const payload = makePayload(e.target.elements);

			selectionDoctorPatientSchema
				.validate(payload, { abortEarly: false })
				.then(() => {
					dispatch(saveCurrentCreate(payload as Payload));
					push("/prescriptions/create");
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
				<Doctors error={errors.doctor} />
				<Patients error={errors.patient} />
				<Button htmlType="submit" type="primary">
					{translate("prescriptions.create.submit")}
				</Button>
			</form>
		</>
	);
};

export default PreCreate;
