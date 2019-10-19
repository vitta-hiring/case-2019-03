import React from "react";
import { Icon, Menu as MenuAntd } from "antd";

import styles from "./theme/index.module.scss";

const { Item } = MenuAntd;

const Menu = () => {
	return (
		<MenuAntd
			theme="dark"
			mode="inline"
			selectedKeys={[]}
			onClick={() => {}}
		>
			<Item title="Menu 1">
				<Icon type="plus" />
				<span>Menu 1</span>
			</Item>
		</MenuAntd>
	);
};

export default Menu;
