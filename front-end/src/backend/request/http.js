import axios from 'axios';
import store from '../store';
import app from '../../main';
import router from 'src/routes/router.js';

const http = axios.create({
	baseURL: store.getters.getbackendURL,
	headers: {
		// Authorization: 'Bearer ' + localStorage.getItem('token'),
		'Accept-Language': localStorage.getItem('locale'),
		'Content-Type': 'application/json',
		'x-access-token': localStorage.getItem('token'),
	}
});

http.interceptors.request.use(
	(config) => {
		app.$Progress.start();
		const token = localStorage.token;
		const accessToken = localStorage.accessToken;
		const language = localStorage.locale;			
		if (token) config.headers['x-access-token'] = `${token}`;
		if (accessToken) {
			config.headers.access_token = accessToken;
		}
		if (language) {
			config.headers['Accept-Language'] = language;
		}
		return config;
	},
	(error) => {
		app.$Progress.fail();
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(response) => {
		app.$Progress.finish();
		return response;
	},
	(error) => {
		if (error == store.getters.getResponse.notAuthorized) {
			store.commit("setResetByTokenExpired", true);
			router.push({ path: `/login` });
		}
		app.$Progress.fail();
		return Promise.reject(error);
	}
);

export default http;
