import { Creators as patientActions } from '../../store/ducks/patient'
import * as store from '../../store'

const AddPatient = patient => {
    const { patients } = store.default.getSate().patientstate

    patients.push(patient)

    store.default.dispatch(patientActions.setPatient(patients))
}

const EditPatient = patient => {
    const { patients } = store.default.getSate().patientstate

    // improve to find last and remove for add new
    patients.remove(patient) // not working for this moment

    patients.push(patient)

    store.default.dispatch(patientActions.setPatient(patients))
}

const RemovePatient = patient => {
    const { patients } = store.default.getSate().patientstate

    patients.remove(patient)

    store.default.dispatch(patientActions.setPatient(patients))
}

const ListPatients = () => {
    return store.default.getSate().patientstate.patients
}

export default {
    AddPatient,
    EditPatient,
    RemovePatient,
    ListPatients
}
