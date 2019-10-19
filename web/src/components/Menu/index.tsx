import React, { useMemo } from "react";
import { withRouter } from "react-router-dom";
import { Icon, Menu as MenuAntd } from "antd";
import { useTranslation } from "react-i18next";

import { routes } from "../../router/constants";
import { Route, Routes } from "../../router/types";
import { reducers } from "../../store/reducers";
import { useSelector } from "react-redux";

const { Item, SubMenu } = MenuAntd;

const menuIcon = (route: Route) => {
	return route.icon ? (
		<Icon
			component={
				typeof route.icon !== "string"
					? (route.icon as React.FC<any>)
					: undefined
			}
			type={typeof route.icon === "string" ? route.icon : undefined}
		/>
	) : null;
};

const Menu = withRouter(({ history: { push }, location: { pathname } }) => {
	const { t: translate } = useTranslation();

	const user = useSelector((state: typeof reducers) => state.login.user);

	if (!user) return null;

	const { role } = user;

	return (
		<MenuAntd
			theme="dark"
			mode="inline"
			selectedKeys={[pathname]}
			onClick={({ key }) => push(key)}
		>
			{routes.map(route => {
				if (route.subRoutes)
					return (
						<SubMenu
							key={route.path || route.title}
							title={
								<span>
									{menuIcon(route)}
									<span>{translate(route.title)}</span>
								</span>
							}
						>
							{route.subRoutes.map(subRoute => {
								if (!subRoute.menu) return null;

								return (
									<Item
										key={subRoute.path}
										title={translate(subRoute.title)}
									>
										{menuIcon(subRoute)}
										<span>{translate(subRoute.title)}</span>
									</Item>
								);
							})}
						</SubMenu>
					);

				if (!route.menu || !route.path) return null;

				return (
					<Item key={route.path} title={translate(route.title)}>
						{menuIcon(route)}
						<span>{translate(route.title)}</span>
					</Item>
				);
			})}
		</MenuAntd>
	);
});

export default Menu;
