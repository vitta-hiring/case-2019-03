import React, { useMemo } from "react";
import { Button, Divider, Table, Tag } from "antd";
import { useTranslation } from "react-i18next";

import { MedicinePrescription, Medicine } from "../../../../types";

type Props = {
	medicines: MedicinePrescription[];
	onRemove: (index: number) => void;
};

const View: React.FC<Props> = ({ medicines, onRemove }) => {
	const { t: translate } = useTranslation();

	const columns = useMemo(
		() => [
			{
				title: translate("prescriptions.create.medicine.label"),
				dataIndex: "medicine",
				render: (medicine: Medicine) => (
					<span>
						{medicine.Nome}
						{medicine.Farmacos.map(farmaco => (
							<React.Fragment key={`${medicine.id}_${farmaco}`}>
								<Divider type="vertical" />
								<Tag key={farmaco}>{farmaco}</Tag>
							</React.Fragment>
						))}
					</span>
				)
			},
			{
				title: translate("prescriptions.create.dosage.label"),
				dataIndex: "dosage"
			},
			{
				title: translate(
					"prescriptions.create.administrationRoute.label"
				),
				dataIndex: "administrationRoute"
			},
			{
				render: (
					_: string,
					record: MedicinePrescription,
					index: number
				) => (
					<Button onClick={() => onRemove(index)} type="danger">
						Deletar
					</Button>
				)
			}
		],
		[onRemove, translate]
	);

	return (
		<Table
			columns={columns}
			dataSource={[...medicines]}
			pagination={false}
			rowKey={(record: MedicinePrescription) =>
				`${record.medicine && record.medicine.id}_${record.dosage}_${
					record.administrationRoute
				}`
			}
		/>
	);
};

export default View;