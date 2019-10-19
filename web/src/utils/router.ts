import { Route, Props } from "../router/types";

export const routeToProps = (route: Route): Props => {
	const props: Props = {
		exact: route.exact || false,
		path: route.path
	};

	if (route.component) {
		props.component = route.component;
	}

	if (route.render) {
		props.render = route.render;
	}

	return props;
};
