import React, { useEffect } from "react";
import { Switch, Route, RouteProps, withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { logoff } from "../modules/Login/actions";
import { reducers } from "../store/reducers";
import { routeToProps } from "../utils/router";
import { routes } from "./constants";
import { Route as RouteT } from "./types";

const Router = withRouter(
	({ history: { replace }, location: { pathname } }) => {
		const user = useSelector((state: typeof reducers) => state.login.user);

		const dispatch = useDispatch();

		useEffect(() => {
			if (user) {
				if (
					user.expirationDate > Math.floor(Date.now() / 1000) &&
					pathname === "/login"
				) {
					replace("/");
				}

				if (user.expirationDate <= Math.floor(Date.now() / 1000)) {
					dispatch(logoff());
					replace("/login");
				}
			} else {
				if (pathname !== "/login") {
					replace("/login");
				}
			}
		}, []);

		if (!user) {
			const login = routes.find(route => route.path === "/login");
			return (
				<Layout logged={false}>
					<Route {...(login as RouteProps)} />
				</Layout>
			);
		}

		return (
			<Layout logged>
				<Switch>
					{routes.flatMap((route, index) => {
						if (route.subRoutes) {
							return route.subRoutes.map(
								(subRoute, innerIndex) => (
									<ProtectedRoute
										key={`${subRoute.title}_${innerIndex}`}
										{...subRoute}
									/>
								)
							);
						}

						return (
							<ProtectedRoute
								key={`${route.title}_${index}`}
								{...route}
							/>
						);
					})}
				</Switch>
			</Layout>
		);
	}
);

const ProtectedRoute: React.FC<RouteT> = route => {
	const user = useSelector((state: typeof reducers) => state.login.user);

	if (!user) return null;

	const props = routeToProps(route);

	return <Route {...(props as RouteProps)} />;
};

export default Router;
