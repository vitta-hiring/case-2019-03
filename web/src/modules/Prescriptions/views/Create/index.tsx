import React, { useEffect, useState, SyntheticEvent, useRef } from "react";
import { Button, Row, Col, Badge, Modal, message } from "antd";
import _isEqual from "lodash/isEqual";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { reducers } from "../../../../store/reducers";
import { usePrevious } from "../../../../utils/hooks";
import {
	getDrugInteraction,
	createPrescription,
	clearDrugInteraction
} from "../../actions";
import Drawer from "../../components/Drawer";
import View from "../../components/View";
import { MedicinePrescription } from "../../types";

import Medicines from "./components/Medicines";
import styles from "./theme/index.module.scss";

const Create: React.FC = () => {
	const [drugs, setDrugs] = useState<string[]>([]);
	const [medicines, setMedicines] = useState<MedicinePrescription[]>([]);
	const [opened, setOpened] = useState(false);
	const [viewedInteraction, setViewedInteraction] = useState(false);

	const dispatch = useDispatch();

	const { push, replace } = useHistory();

	const previousDrugs = usePrevious(drugs);
	const previousMedicines = usePrevious(medicines);

	const form = useRef<any>();

	const {
		currentCreate: { doctor, patient },
		drugInteraction,
		drugInteractionLoading,
		createPrescriptionFail,
		createPrescriptionLoading,
		createPrescriptionSuccess
	} = useSelector((state: typeof reducers) => state.prescriptions);

	const { t: translate } = useTranslation();

	useEffect(() => {
		if (!doctor || !patient) {
			replace("/prescriptions/pre-create");
		}
	}, []);

	useEffect(() => {
		if (createPrescriptionFail) {
			message.error(translate(createPrescriptionFail));
		}
	}, [createPrescriptionFail]);

	useEffect(() => {
		if (createPrescriptionSuccess) {
			Modal.success({
				title: translate("prescriptions.create.success"),
				onCancel: () => push("/prescriptions/pre-create"),
				onOk: () => push("/prescriptions/pre-create")
			});
		}
	}, [createPrescriptionSuccess]);

	useEffect(() => {
		if (drugs.length >= 2 && !_isEqual(previousDrugs, drugs)) {
			dispatch(getDrugInteraction(drugs));
		}

		if (drugs.length < 2) {
			dispatch(clearDrugInteraction());
		}
	}, [drugs]);

	useEffect(() => {
		if (!_isEqual(previousMedicines, medicines)) {
			const innerDrugs = medicines.reduce((result: string[], current) => {
				return [
					...Array.from(
						new Set([
							...result,
							...(current.medicine
								? current.medicine.Farmacos
								: [])
						])
					)
				];
			}, []);
			setDrugs(innerDrugs);
		}
	}, [medicines, previousMedicines]);

	useEffect(() => {
		if (opened && !viewedInteraction) {
			setViewedInteraction(true);
		}
	}, [opened]);

	const toggleDrawer = () => setOpened(!opened);

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		if (!!drugInteraction.length && !viewedInteraction) {
			return Modal.confirm({
				title: translate(
					"prescriptions.create.drugInteraction.warning"
				),
				okText: translate("generics.ignoreContinue"),
				onOk: submit,
				cancelText: translate(
					"prescriptions.create.drugInteraction.report"
				),
				onCancel: toggleDrawer
			});
		}

		submit();
	};

	const submit = () => {
		const payload = {
			doctor,
			drugInteraction,
			medicines,
			patient
		};

		dispatch(createPrescription(payload));
	};

	return (
		<>
			<h1>
				{translate("prescriptions.create.title")}{" "}
				<Badge
					className={styles.drugInteraction}
					count={drugInteraction.length}
				>
					<Button
						disabled={!drugInteraction.length}
						onClick={toggleDrawer}
						type="danger"
						ghost
						loading={drugInteractionLoading}
					>
						{translate(
							"prescriptions.create.drugInteraction.label"
						)}
					</Button>
				</Badge>
			</h1>
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
			<form onSubmit={onSubmit} ref={form}>
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
					className={styles.save}
					disabled={
						!medicines.length ||
						drugInteractionLoading ||
						createPrescriptionLoading
					}
					htmlType="submit"
					loading={createPrescriptionLoading}
					type="primary"
				>
					{translate("generics.save")}
				</Button>
			</form>
			<Drawer
				drugInteraction={drugInteraction}
				opened={opened}
				toggleDrawer={toggleDrawer}
			/>
		</>
	);
};

export default Create;
