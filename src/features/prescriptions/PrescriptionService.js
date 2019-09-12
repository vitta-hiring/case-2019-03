import { Creators as prescriptionActions } from '../../store/ducks/prescription'
import * as store from '../../store'

const AddPrescription = prescription => {
    const { prescriptions } = store.default.getSate().prescriptionstate

    prescriptions.push(prescription)

    store.default.dispatch(prescriptionActions.setPrescription(prescriptions))
}

const EditPrescription = prescription => {
    const { prescriptions } = store.default.getSate().prescriptionstate

    // improve to find last and remove for add new
    prescriptions.remove(prescription) // not working for this moment

    prescriptions.push(prescription)

    store.default.dispatch(prescriptionActions.setPrescription(prescriptions))
}

const RemovePrescription = prescription => {
    const { prescriptions } = store.default.getSate().prescriptionstate

    prescriptions.remove(prescription)

    store.default.dispatch(prescriptionActions.setPrescription(prescriptions))
}

const ListPrescriptions = () => {
    return store.default.getSate().prescriptionstate.prescriptions
}

export default {
    AddPrescription,
    EditPrescription,
    RemovePrescription,
    ListPrescriptions
}
