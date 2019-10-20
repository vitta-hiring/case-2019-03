import React, { useState, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AutoComplete, Form, message, Row, Col, Input, Button } from "antd";
import _debounce from "lodash/debounce";

import { getMedicines } from "../../../../actions";
import {
	GET_MEDICINES_SUCCESS,
	addMedicineSchema
} from "../../../../constants";
import { SelectValue } from "antd/lib/select";

import styles from "./theme/index.module.scss";
import { AxiosResponse } from "../../../../../../types";
import { Medicine } from "../../../../types";
import { makeErrorsFromYup } from "../../../../../../utils/forms";

const { Item } = Form;

type State = {
	errors: {
		medicine?: string;
		dosage?: string;
		administrationRoute?: string;
	};
};

const Medicines: React.FC<{ onAdd: (medicine: {}) => void }> = ({ onAdd }) => {
	const { t: translate } = useTranslation();

	const [errors, setErrors] = useState<State["errors"]>({});
	const [loading, setLoading] = useState(false);
	const [medicines, setMedicines] = useState([]);
	const [medicinesDataSource, setMedicinesDataSource] = useState([]);
	const [payload, setPayload] = useState<{
		medicine: Medicine | null;
		dosage: string;
		administrationRoute: string;
	}>({
		medicine: null,
		dosage: "",
		administrationRoute: ""
	});

	const dispatch = useDispatch();

	const onSearch = _debounce(val => {
		setLoading(false);
		setMedicines([]);
		setPayload({ ...payload, medicine: null });
		setMedicinesDataSource([]);

		if (val.length < 3) {
			return setErrors({
				...errors,
				medicine: "prescriptions.create.validations.medicines.length"
			});
		}

		setErrors({
			...errors,
			medicine: undefined
		});
		setLoading(true);
		((dispatch(getMedicines(val)) as unknown) as Promise<any>).then(
			(response: AxiosResponse) => {
				setLoading(false);
				if (response.type === GET_MEDICINES_SUCCESS) {
					if (!!response.payload.data.length) {
						setMedicines(response.payload.data);
						const dataSource = response.payload.data.map(
							(medicine: Medicine) => ({
								text: medicine.Nome,
								value: medicine.id
							})
						);
						return setMedicinesDataSource(dataSource);
					}
					return message.error(
						translate(
							"prescriptions.create.validations.medicines.empty"
						)
					);
				}
			}
		);
	}, 400);

	const onSelect = (val: SelectValue) => {
		const medicine: Medicine = medicines.filter(
			(medicine: Medicine) => medicine.id === Number(val)
		)[0];
		setErrors({
			...errors,
			administrationRoute: undefined
		});
		setPayload({
			...payload,
			administrationRoute: medicine.ViaAdministracao,
			medicine
		});
	};

	const handleChange = (e: SyntheticEvent) => {
		e.preventDefault();

		if (e.target instanceof HTMLInputElement) {
			const target = e.target.name;
			setErrors({
				...errors,
				[target]: undefined
			});
			setPayload({
				...payload,
				[target]: e.target.value
			});
		}
	};

	const onPreAdd = () => {
		addMedicineSchema
			.validate(payload, { abortEarly: false })
			.then(() => {
				onAdd(payload);
			})
			.catch(err => {
				const yupErrors = makeErrorsFromYup(err);
				setErrors(yupErrors);
			});
	};

	return (
		<Row gutter={24}>
			<Col span={10}>
				<Item
					label={translate("prescriptions.create.medicine.label")}
					hasFeedback
					validateStatus={
						loading
							? "validating"
							: errors.medicine
							? "error"
							: undefined
					}
					help={
						!loading &&
						errors.medicine &&
						translate(errors.medicine)
					}
				>
					<AutoComplete
						dataSource={medicinesDataSource}
						onSearch={onSearch}
						onSelect={onSelect}
					/>
				</Item>
			</Col>
			<Col span={5}>
				<Item
					htmlFor="prescriptions:create:dosage"
					label={translate("prescriptions.create.dosage.label")}
					hasFeedback
					validateStatus={errors.dosage ? "error" : undefined}
					help={errors.dosage && translate(errors.dosage)}
				>
					<Input
						id="prescriptions:create:dosage"
						name="dosage"
						onChange={handleChange}
						value={payload.dosage}
					/>
				</Item>
			</Col>
			<Col span={5}>
				<Item
					htmlFor="prescriptions:create:administrationRoute"
					label={translate(
						"prescriptions.create.administrationRoute.label"
					)}
					hasFeedback
					validateStatus={
						errors.administrationRoute ? "error" : undefined
					}
					help={
						errors.administrationRoute &&
						translate(errors.administrationRoute)
					}
				>
					<Input
						id="prescriptions:create:administrationRoute"
						name="administrationRoute"
						onChange={handleChange}
						value={payload.administrationRoute}
					/>
				</Item>
			</Col>
			<Col span={4} className={styles.add}>
				<Button onClick={onPreAdd}>{translate("generics.add")}</Button>
			</Col>
		</Row>
	);
};

export default Medicines;
