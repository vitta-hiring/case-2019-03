import React, { useEffect, useState, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Select, message, Row, Col } from "antd";

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
import Medicines from "./components/Medicines";

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

	const [medicines, setMedicines] = useState<{}[]>([]);

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
			<Row gutter={24}>
				<Col span={12}>
					<h2>{translate("prescriptions.create.doctors.label")}</h2>
					<p>{doctor.name}</p>
				</Col>
				<Col span={12}>
					<h2>{translate("prescriptions.create.patients.label")}</h2>
					<p>{patient.name}</p>
				</Col>
			</Row>
			<form onSubmit={onSubmit}>
				<input name={doctor} type="hidden" value={doctor.id} />
				<input name={patient} type="hidden" value={patient.id} />
				<fieldset>
					<legend>
						{translate("prescriptions.create.medicines.label")}
					</legend>
					<Medicines
						onAdd={
							(medicine: {}) =>
								console.log(
									"TCL: Create:React.FC -> medicine",
									medicine
								)
							// setMedicines([...medicines, medicine])
						}
					/>
				</fieldset>
				<Button
					disabled={!medicines.length}
					htmlType="submit"
					type="primary"
				>
					{translate("generics.save")}
				</Button>
			</form>
		</>
	);
};

export default Create;
