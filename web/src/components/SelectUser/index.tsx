import React from "react";
import { Avatar, Icon, Menu, Dropdown, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logoff } from "../../modules/Login/actions";
import { reducers } from "../../store/reducers";

import styles from "./theme/index.module.scss";

const SelectUser = () => {
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const userName = useSelector(
		(state: typeof reducers) => state.login.user.name
	);
	const { i18n, t: translate } = useTranslation();

	const menu = (
		<Menu
			selectedKeys={[i18n.language]}
			onClick={({ key }) => {
				switch (key) {
					case "logoff":
						dispatch(logoff());
						return replace("/login");
				}
			}}
		>
			<Menu.Item key="logoff">
				<Icon type="logout" />
				<span> {translate("login.logoff")}</span>
			</Menu.Item>
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
