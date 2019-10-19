import React from "react";
import { Provider, useSelector } from "react-redux";
import store from "./store";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<h1>Vitta Challenge</h1>
			<Test />
		</Provider>
	);
};

const Test = () => {
	const teste = useSelector(state => console.log(state));
	return <></>;
};

export default App;
