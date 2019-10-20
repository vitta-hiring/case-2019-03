import React, { useMemo, useEffect, useState } from "react";
import { Button, Table, message, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import { reducers } from "../../../../store/reducers";
import { removePrescription, getPrescriptions } from "../../actions";
import Drawer from "../../components/Drawer";
import View from "../../components/View";
import {
	Prescription,
	MedicinePrescription,
	Person,
	DrugInteraction
} from "../../types";

const List: React.FC = () => {
	const dispatch = useDispatch();
	const {
		prescriptions,
		prescriptionsFail,
		prescriptionsLoading
	} = useSelector((state: typeof reducers) => state.prescriptions);
	const [opened, setOpened] = useState(false);
	const [drugInteraction, setDrugInteraction] = useState<DrugInteraction[]>(
		[]
	);
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
		Modal.confirm({
			title: translate("prescriptions.remove"),
			onOk: () => remove(id, index)
		});

	const remove = (id: number, index: number) =>
		dispatch(removePrescription(id, index));

	const columns = useMemo(
		() => [
			{
				title: translate("generics.date"),
				dataIndex: "date",
				render: (date: number) => (
					<span>{!!date && format(date, "dd/MM/yyyy HH:mm")}</span>
				)
			},
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
								onClick={() => {
									setDrugInteraction(drugInteraction);
									toggleDrawer();
								}}
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
						{translate("generics.remove")}
					</Button>
				)
			}
		],
		[onRemove, translate]
	);

	const toggleDrawer = () => setOpened(!opened);

	return (
		<>
			<h1>{translate("prescriptions.list")}</h1>
			<Table
				columns={columns}
				loading={prescriptionsLoading}
				dataSource={prescriptions}
				pagination={false}
				rowKey={(record: Prescription, index: number) =>
					`${record.id && record.id}_${index}`
				}
			/>
			<Drawer
				drugInteraction={drugInteraction}
				opened={opened}
				toggleDrawer={toggleDrawer}
			/>
		</>
	);
};

export default List;
