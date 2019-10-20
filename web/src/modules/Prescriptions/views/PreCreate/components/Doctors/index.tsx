import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Form, Select, message } from "antd";

import { clearDoctorsFail, getDoctors } from "../../../../actions";
import { reducers } from "../../../../../../store/reducers";
import { Person } from "../../../../types";
import { usePrevious } from "../../../../../../utils/hooks";

const { Item } = Form;
const { Option } = Select;

const Doctors: React.FC<{ error?: string }> = ({ error }) => {
	const { t: translate } = useTranslation();

	const [doctor, setDoctor] = useState<number | string>("");

	const { doctors, doctorsFail, doctorsLoading } = useSelector(
		(state: typeof reducers) => state.prescriptions
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDoctors());
	}, []);

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

	return (
		<Item
			htmlFor="prescriptions:create:doctor"
			label={translate("prescriptions.create.doctors.label")}
			hasFeedback
			validateStatus={
				doctorsLoading ? "validating" : error ? "error" : undefined
			}
			help={!doctorsLoading && error && translate(error)}
		>
			<input
				type="hidden"
				id="prescriptions:create:doctor"
				name="doctor"
				value={doctor}
			/>
			<Select
				size="large"
				onSelect={value => setDoctor(value as number)}
				placeholder={translate(
					"prescriptions.create.doctors.placeholder"
				)}
			>
				{doctors.map((doctor: Person) => (
					<Option key={doctor.id} value={doctor.id}>
						{doctor.name}
					</Option>
				))}
			</Select>
		</Item>
	);
};

export default Doctors;
