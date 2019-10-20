import React, { useMemo, useEffect } from "react";
import { Button, Divider, Table, Tag, message } from "antd";
import { useTranslation } from "react-i18next";
import {
	Prescription,
	Medicine,
	MedicinePrescription,
	Person,
	DrugInteraction
} from "../../types";
import { removePrescription, getPrescriptions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { View } from "../Create/components/Medicines";
import { reducers } from "../../../../store/reducers";

const List: React.FC = () => {
	const dispatch = useDispatch();
	const {
		prescriptions,
		prescriptionsFail,
		prescriptionsLoading
	} = useSelector((state: typeof reducers) => state.prescriptions);
	const { t: translate } = useTranslation();

	useEffect(() => {
		dispatch(getPrescriptions());
	}, []);

	useEffect(() => {
		if (prescriptionsFail) {
			message.error(translate(prescriptionsFail));
		}
	}, [prescriptionsFail]);

	const onRemove = (id: number, index: number) =>
		dispatch(removePrescription(id, index));

	const columns = useMemo(
		() => [
			{
				title: translate("prescriptions.create.doctors.label"),
				dataIndex: "doctor",
				render: (doctor: Person) => <span>{doctor.name}</span>
			},
			{
				title: translate("prescriptions.create.patients.label"),
				dataIndex: "patient",
				render: (patient: Person) => <span>{patient.name}</span>
			},
			{
				title: translate("prescriptions.create.medicines.label"),
				dataIndex: "medicines",
				render: (medicines: MedicinePrescription[]) => (
					<span>
						<View medicines={medicines} />
					</span>
				)
			},
			{
				title: translate("prescriptions.create.drugInteraction.label"),
				dataIndex: "drugInteraction",
				render: (drugInteraction: DrugInteraction[]) => {
					return (
						!!drugInteraction.length && (
							<Button
								type="danger"
								ghost
								shape="round"
								icon="warning"
								size="small"
							>
								{translate(
									"prescriptions.create.drugInteraction.report"
								)}
							</Button>
						)
					);
				}
			},
			{
				render: (_: string, record: Prescription, index: number) => (
					<Button
						onClick={() => record.id && onRemove(record.id, index)}
						type="danger"
					>
						Deletar
					</Button>
				)
			}
		],
		[onRemove, translate]
	);

	return (
		<>
			<h1>{translate("prescriptions.list")}</h1>
			<Table
				columns={columns}
				loading={prescriptionsLoading}
				dataSource={prescriptions}
				pagination={false}
				// rowKey={(record: MedicinePrescription) =>
				// 	`${record.medicine && record.medicine.id}_${
				// 		record.dosage
				// 	}_${record.administrationRoute}`
				// }
			/>
		</>
	);
};

export default List;
