import React, { useEffect, useState, SyntheticEvent, useRef } from "react";
import { Alert, Button, Drawer, Row, Col, Badge, Divider, Modal } from "antd";
import _isEqual from "lodash/isEqual";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { reducers } from "../../../../store/reducers";
import { makePayload } from "../../../../utils/forms";
import { usePrevious } from "../../../../utils/hooks";
import { getDrugInteraction } from "../../actions";
import { MedicinePrescription, DrugInteraction } from "../../types";

import Medicines, { View } from "./components/Medicines";
import styles from "./theme/index.module.scss";

type State = {
	errors: {};
};

const Create: React.FC = () => {
	const [drugs, setDrugs] = useState<string[]>([]);
	const [errors, setErrors] = useState<State["errors"]>({});
	const [medicines, setMedicines] = useState<MedicinePrescription[]>([]);
	const [opened, setOpened] = useState(false);
	const [viewedInteraction, setViewedInteraction] = useState(false);

	const dispatch = useDispatch();

	const { replace } = useHistory();

	const previousDrugs = usePrevious(drugs);
	const previousMedicines = usePrevious(medicines);

	const form = useRef<any>();

	const {
		currentCreate: { doctor, patient },
		drugInteraction,
		drugInteractionLoading
	} = useSelector((state: typeof reducers) => state.prescriptions);

	const { t: translate } = useTranslation();

	useEffect(() => {
		if (!doctor || !patient) {
			replace("/prescriptions/pre-create");
		}
	}, []);

	useEffect(() => {
		if (drugs.length >= 2 && !_isEqual(previousDrugs, drugs)) {
			dispatch(getDrugInteraction(drugs));
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

		if (!viewedInteraction) {
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
		setErrors({});

		const e = form.current;

		if (e) {
			const payload = makePayload(e.elements);
			console.log("TCL: onSubmit -> payload", payload);
		}
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
					disabled={!medicines.length}
					htmlType="submit"
					type="primary"
				>
					{translate("generics.save")}
				</Button>
			</form>
			{!!drugInteraction.length && (
				<Drawer
					className={styles.drawer}
					title={translate(
						"prescriptions.create.drugInteraction.label"
					)}
					closable
					onClose={toggleDrawer}
					visible={opened}
					width="70vw"
				>
					{drugInteraction.map(
						(drug: DrugInteraction, index: number) => (
							<React.Fragment
								key={`${drug.Farmaco1}_${drug.Farmaco2}`}
							>
								<Alert
									message={`${translate(
										"prescriptions.create.drugInteraction.drugs"
									)}: ${drug.Farmaco1} | ${drug.Farmaco2}`}
									description={drug.Descricao}
									type={
										drug.Nome === "Leve"
											? "info"
											: drug.Nome === "Moderada"
											? "warning"
											: "error"
									}
								/>
								{drugInteraction.length - 1 !== index && (
									<Divider />
								)}
							</React.Fragment>
						)
					)}
				</Drawer>
			)}
		</>
	);
};

export default Create;
