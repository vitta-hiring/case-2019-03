import React, { useEffect, useState, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Row, Col } from "antd";
import _isEqual from "lodash/isEqual";

import { reducers } from "../../../../store/reducers";
import { MedicinePrescription } from "../../types";
import { makePayload } from "../../../../utils/forms";
import { useHistory } from "react-router";
import Medicines, { View } from "./components/Medicines";

type State = {
	errors: {};
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

	const [medicines, setMedicines] = useState<MedicinePrescription[]>([]);

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		setErrors({});

		if (e.target instanceof HTMLFormElement) {
			const payload = makePayload(e.target.elements);
			console.log("TCL: onSubmit -> payload", payload);
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
						onAdd={(medicine: MedicinePrescription) => {
							if (
								!!medicines.filter(innerMedicine =>
									_isEqual(innerMedicine, medicine)
								).length
							)
								return;

							setMedicines([...medicines, medicine]);
						}}
					/>
					<View
						medicines={medicines}
						onRemove={index =>
							setMedicines([
								...medicines.slice(0, index),
								...medicines.slice(index + 1)
							])
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
