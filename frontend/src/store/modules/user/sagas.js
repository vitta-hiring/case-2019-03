import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, avatar_id, ...rest } = payload.data;
        const profile = {
            name,
            avatar_id,
            ...(rest.oldPassword ? rest : {}),
        };
        // console.tron.log(profile);
        const response = yield call(api.put, 'user', profile);
        console.tron.log(response);
        if (response.data.message) {
            toast.error(response.data.message);
            yield put(updateProfileFailure());
        } else if (response.data) {
            toast.success('Perfil atualizado com sucesso');
            yield put(updateProfileSuccess(response.data));
        } else {
            toast.error('Erro ao atualizar o perfil, confira seus dados!');
            yield put(updateProfileFailure());
        }
    } catch (err) {
        toast.error('Erro ao atualizar o perfil, confira seus dados!');
        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
