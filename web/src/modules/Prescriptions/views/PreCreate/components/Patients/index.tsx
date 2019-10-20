import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Form, Select, message } from "antd";

import { clearPatientsFail, getPatients } from "../../../../actions";
import { reducers } from "../../../../../../store/reducers";
import { Person } from "../../../../types";
import { usePrevious } from "../../../../../../utils/hooks";

const { Item } = Form;
const { Option } = Select;

const Patients: React.FC<{ error?: string }> = ({ error }) => {
	const { t: translate } = useTranslation();

	const [patient, setPatient] = useState<number | string>("");

	const { patients, patientsFail, patientsLoading } = useSelector(
		(state: typeof reducers) => state.prescriptions
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPatients());
	}, []);

	const previousPatientsFail = usePrevious(patientsFail);
	useEffect(() => {
		if (
			patientsFail &&
			patientsFail.length &&
			patientsFail !== previousPatientsFail
		) {
			message.error(translate(patientsFail));
			dispatch(clearPatientsFail());
		}
	}, [patientsFail, previousPatientsFail]);

	return (
		<Item
			htmlFor="prescriptions:create:patient"
			label={translate("prescriptions.create.patients.label")}
			hasFeedback
			validateStatus={
				patientsLoading ? "validating" : error ? "error" : undefined
			}
			help={!patientsLoading && error && translate(error)}
		>
			<input
				type="hidden"
				id="prescriptions:create:patient"
				name="patient"
				value={patient}
			/>
			<Select
				size="large"
				onSelect={value => setPatient(value as number)}
				placeholder={translate(
					"prescriptions.create.patients.placeholder"
				)}
			>
				{patients.map((patient: Person) => (
					<Option key={patient.id} value={patient.id}>
						{patient.name}
					</Option>
				))}
			</Select>
		</Item>
	);
};

export default Patients;
