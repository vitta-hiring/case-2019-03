import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import Layout from "./components/Layout";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Layout logged={true} />
		</Provider>
	);
};

export default App;
