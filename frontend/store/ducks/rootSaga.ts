import { all, takeLatest} from 'redux-saga/effects';
import { AuthTypes } from './auth/types';
import { signIn } from './auth/sagas';
import { SignUpTypes } from './signup/types';
import { validateEmail, signUp } from './signup/sagas';
import { DrugTypes } from './drug/types';
import { fetchDrug, deleteDrug, createDrug } from './drug/sagas';
import { DrugsInteractionsTypes } from './drugsinteractions/types';
import { fetchDrugsInteractions, createDrugsInteractions, deleteDrugsInteractions } from './drugsinteractions/sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.SIGNIN_REQUEST, signIn),
        takeLatest(SignUpTypes.SIGNUP_REQUEST, signUp),
        takeLatest(SignUpTypes.VALIDATE_EMAIL_REQUEST, validateEmail),
        takeLatest(DrugTypes.DRUG_FETCH, fetchDrug),
        takeLatest(DrugTypes.DRUG_CREATE, createDrug),
        takeLatest(DrugTypes.DRUG_DELETE, deleteDrug),
        takeLatest(DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH, fetchDrugsInteractions),
        takeLatest(DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE, createDrugsInteractions),
        takeLatest(DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE, deleteDrugsInteractions),
    ])
}