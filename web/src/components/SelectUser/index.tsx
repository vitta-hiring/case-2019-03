import { Avatar, Icon, Menu, Dropdown, Button } from "antd";
import React from "react";
import styles from "./theme/index.module.scss";
import { useTranslation } from "react-i18next";

const SelectUser = () => {
	const { i18n } = useTranslation();
	const userName = "André do Vale";

	const menu = (
		<Menu selectedKeys={[i18n.language]} onClick={() => {}}>
			<Menu.Item key="0">menu 1</Menu.Item>
			<Menu.Item key="1">menu 2</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
			<Button type="link">
				<Avatar
					className={styles.avatar}
					src="https://picsum.photos/64/64"
				/>
				{userName} <Icon className={styles.dropdownIcon} type="down" />
			</Button>
		</Dropdown>
	);
};

export default SelectUser;
