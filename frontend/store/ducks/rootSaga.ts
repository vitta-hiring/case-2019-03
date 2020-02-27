import { all, takeLatest} from 'redux-saga/effects';
import { AuthTypes } from './auth/types';
import { signIn } from './auth/sagas';
import { SignUpTypes } from './signup/types';
import { validateEmail, signUp } from './signup/sagas';
import { DrugTypes } from './drug/types';
import { fetchDrug, deleteDrug, createDrug } from './drug/sagas';
import { DrugsInteractionsTypes } from './drugsinteractions/types';
import { fetchDrugsInteractions, createDrugsInteractions, deleteDrugsInteractions } from './drugsinteractions/sagas';
import { MedicineTypes } from './medicines/types';
import { fetchMedicines, createMedicine, deleteMedicine, fetchMedicineInteractions } from './medicines/sagas';
import { PrescriptionTypes } from './prescriptions/types';
import { fetchPrescriptions, createPrescription, deletePrescription } from './prescriptions/sagas';
import { UserTypes } from './users/types';
import { fetchUsers } from './users/sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.SIGNIN_REQUEST, signIn),
        takeLatest(UserTypes.USERS_FETCH, fetchUsers),
        takeLatest(SignUpTypes.SIGNUP_REQUEST, signUp),
        takeLatest(SignUpTypes.VALIDATE_EMAIL_REQUEST, validateEmail),
        takeLatest(DrugTypes.DRUG_FETCH, fetchDrug),
        takeLatest(DrugTypes.DRUG_CREATE, createDrug),
        takeLatest(DrugTypes.DRUG_DELETE, deleteDrug),
        takeLatest(DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH, fetchDrugsInteractions),
        takeLatest(DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE, createDrugsInteractions),
        takeLatest(DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE, deleteDrugsInteractions),
        takeLatest(MedicineTypes.MEDICINE_FETCH, fetchMedicines),
        takeLatest(MedicineTypes.MEDICINE_INTERACTION_FETCH, fetchMedicineInteractions),
        takeLatest(MedicineTypes.MEDICINE_CREATE, createMedicine),
        takeLatest(MedicineTypes.MEDICINE_DELETE, deleteMedicine),
        takeLatest(PrescriptionTypes.PRESCRIPTION_FETCH, fetchPrescriptions),
        takeLatest(PrescriptionTypes.PRESCRIPTION_CREATE, createPrescription),
        takeLatest(PrescriptionTypes.PRESCRIPTION_DELETE, deletePrescription),
    ])
}