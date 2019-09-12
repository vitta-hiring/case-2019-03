import { Creators as doctorActions } from '../../store/ducks/doctor'
import * as store from '../../store'

const AddDoctor = doctor => {
    const { doctors } = store.default.getSate().doctorState

    doctors.push(doctor)

    store.default.dispatch(doctorActions.setDoctor(doctors))
}

const EditDoctor = doctor => {
    const { doctors } = store.default.getSate().doctorState

    // improve to find last and remove for add new
    doctors.remove(doctor) // not working for this moment

    doctors.push(doctor)

    store.default.dispatch(doctorActions.setDoctor(doctors))
}

const RemoveDoctor = doctor => {
    const { doctors } = store.default.getSate().doctorState

    doctors.remove(doctor)

    store.default.dispatch(doctorActions.setDoctor(doctors))
}

const ListDoctors = () => {
    return store.default.getSate().doctorState.doctors
}

export default {
    AddDoctor,
    EditDoctor,
    RemoveDoctor,
    ListDoctors
}
