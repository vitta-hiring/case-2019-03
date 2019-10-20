import { Avatar, Icon, Menu, Dropdown, Button } from "antd";
import React from "react";
import styles from "./theme/index.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { reducers } from "../../store/reducers";
import { logoff } from "../../modules/Login/actions";
import { useHistory } from "react-router";

const SelectUser = () => {
	const { replace } = useHistory();
	const { i18n, t: translate } = useTranslation();
	const userName = useSelector(
		(state: typeof reducers) => state.login.user.name
	);
	const dispatch = useDispatch();

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
