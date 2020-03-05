import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;
        const passwordConfirmation = password;

        const response = yield call(api.post, 'user/authenticate', {
            email,
            password,
            passwordConfirmation,
        });
        const { token, user } = response.data;
        api.defaults.headers.Authorization = `Bearer ${token}`;
        yield put(signInSuccess(token, user));
        history.push(`/home`);
    } catch (err) {
        toast.error('Falha na autenticação, verifique usuário e password');
        yield put(signFailure());
    }
}
export function* signUp({ payload }) {
    try {
        const { name, email, password, passwordConfirmation, type } = payload;
        yield call(api.post, 'user/register', {
            name,
            email,
            password,
            passwordConfirmation,
            type,
        });
        history.push(`/`);
    } catch (err) {
        toast.error('Falha no cadastro, verifique os dados');
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;
    if (payload.token === undefined) {
        if (payload.auth.token) {
            api.defaults.headers.Authorization = `Bearer ${payload.auth.token}`;
        }
    } else {
        const { token } = payload.token;
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
    }
}
export function signOut() {
    history.push('/');
}
export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
