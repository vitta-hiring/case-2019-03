import React, { useEffect, useState } from "react";
import { Form, Select, message } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { reducers } from "../../../../../../store/reducers";
import { usePrevious } from "../../../../../../utils/hooks";
import { clearDoctorsFail, getDoctors } from "../../../../actions";
import { Person } from "../../../../types";

const { Item } = Form;
const { Option } = Select;

type Props = { error?: string };

const Doctors: React.FC<Props> = ({ error }) => {
	const dispatch = useDispatch();
	const { doctors, doctorsFail, doctorsLoading } = useSelector(
		(state: typeof reducers) => state.prescriptions
	);
	const previousDoctorsFail = usePrevious(doctorsFail);
	const [doctor, setDoctor] = useState<number | string>("");
	const { t: translate } = useTranslation();

	useEffect(() => {
		dispatch(getDoctors());
	}, []);

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
