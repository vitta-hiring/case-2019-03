import React, { useState, SyntheticEvent, useEffect } from "react";
import { Button, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { reducers } from "../../../../store/reducers";
import { makePayload, makeErrorsFromYup } from "../../../../utils/forms";
import { saveCurrentCreate, clearDrugInteraction } from "../../actions";
import { selectionDoctorPatientSchema } from "../../constants";
import { Person } from "../../types";

import Doctors from "./components/Doctors";
import Patients from "./components/Patients";

type State = {
	errors: {
		doctor?: string;
		patient?: string;
	};
};

const PreCreate: React.FC = () => {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const { doctors, patients } = useSelector(
		(state: typeof reducers) => state.prescriptions
	);
	const [errors, setErrors] = useState<State["errors"]>({});
	const { t: translate } = useTranslation();

	useEffect(() => {
		dispatch(clearDrugInteraction());
	}, []);

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setErrors({});

		if (e.target instanceof HTMLFormElement) {
			const payload = makePayload(e.target.elements);

			selectionDoctorPatientSchema
				.validate(payload, { abortEarly: false })
				.then(() => {
					const doctor = doctors.filter(
						(doctor: Person) => doctor.id === Number(payload.doctor)
					)[0];
					const patient = patients.filter(
						(patient: Person) =>
							patient.id === Number(payload.patient)
					)[0];
					dispatch(
						saveCurrentCreate({
							doctor,
							patient
						})
					);

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
				<Row gutter={24}>
					<Col span={12}>
						<Doctors error={errors.doctor} />
					</Col>
					<Col span={12}>
						<Patients error={errors.patient} />
					</Col>
				</Row>
				<Button htmlType="submit" type="primary">
					{translate("prescriptions.create.submit")}
				</Button>
			</form>
		</>
	);
};

export default PreCreate;
