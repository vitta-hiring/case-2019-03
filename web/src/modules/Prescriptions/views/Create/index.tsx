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
		doctors,
		doctorsFail,
		doctorsLoading,
		patients,
		patientsFail,
		patientsLoading
	} = useSelector((state: typeof reducers) => state.prescriptions);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDoctors());
		dispatch(getPatients());
	}, []);

	const [errors, setErrors] = useState<State["errors"]>({});

	const previousDoctorsFail = usePrevious(doctorsFail);
	useEffect(() => {
		if (
			doctorsFail &&
			doctorsFail.length &&
			doctorsFail !== previousDoctorsFail
		) {
			message.error(translate(doctorsFail));
			dispatch(clearDoctorsFail());
		}
	}, [doctorsFail, previousDoctorsFail]);

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
				<Item
					htmlFor="prescriptions:create:doctor"
					label={translate("prescriptions.create.doctors.label")}
					hasFeedback
					validateStatus={
						doctorsLoading
							? "validating"
							: errors.doctor
							? "error"
							: undefined
					}
					help={
						!doctorsLoading &&
						errors.doctor &&
						translate(errors.doctor)
					}
				>
					<input
						type="hidden"
						id="prescriptions:create:doctor"
						name="doctor"
					/>
					<Select
						size="large"
						placeholder={translate(
							"prescriptions.create.doctors.placeholder"
						)}
					>
						{doctors.map((doctor: Person) => (
							<Option value={doctor.id}>{doctor.name}</Option>
						))}
					</Select>
				</Item>
				<Button htmlType="submit" type="primary">
					{translate("prescriptions.create.submit")}
				</Button>
			</form>
		</>
	);
};

export default Create;
