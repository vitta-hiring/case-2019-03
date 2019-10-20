import React, { useEffect, useState } from "react";
import { Form, Select, message } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { reducers } from "../../../../../../store/reducers";
import { usePrevious } from "../../../../../../utils/hooks";
import { clearPatientsFail, getPatients } from "../../../../actions";
import { Person } from "../../../../types";

const { Item } = Form;
const { Option } = Select;

type Props = { error?: string };

const Patients: React.FC<Props> = ({ error }) => {
	const dispatch = useDispatch();
	const { patients, patientsFail, patientsLoading } = useSelector(
		(state: typeof reducers) => state.prescriptions
	);
	const previousPatientsFail = usePrevious(patientsFail);
	const [patient, setPatient] = useState<number | string>("");
	const { t: translate } = useTranslation();

	useEffect(() => {
		dispatch(getPatients());
	}, []);

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
