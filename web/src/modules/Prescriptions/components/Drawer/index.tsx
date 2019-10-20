import React from "react";
import { Drawer as DrawerAntd, Alert, Divider } from "antd";
import { useTranslation } from "react-i18next";

import { DrugInteraction } from "../../types";

type Props = {
	drugInteraction: DrugInteraction[];
	opened: boolean;
	toggleDrawer: () => void;
};

const Drawer: React.FC<Props> = ({ drugInteraction, opened, toggleDrawer }) => {
	const { t: translate } = useTranslation();

	return (
		<>
			{!!drugInteraction.length && (
				<DrawerAntd
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
				</DrawerAntd>
			)}
		</>
	);
};

export default Drawer;
