import { Creators as medicineActions } from '../../store/ducks/medicine'
import * as store from '../../store'

const AddMedicine = medicine => {
    const { medicines } = store.default.getSate().medicinestate

    medicines.push(medicine)

    store.default.dispatch(medicineActions.setMedicine(medicines))
}

const EditMedicine = medicine => {
    const { medicines } = store.default.getSate().medicinestate

    // improve to find last and remove for add new
    medicines.remove(medicine) // not working for this moment

    medicines.push(medicine)

    store.default.dispatch(medicineActions.setMedicine(medicines))
}

const RemoveMedicine = medicine => {
    const { medicines } = store.default.getSate().medicinestate

    medicines.remove(medicine)

    store.default.dispatch(medicineActions.setMedicine(medicines))
}

const ListMedicines = () => {
    return store.default.getSate().medicinestate.medicines
}

export default {
    AddMedicine,
    EditMedicine,
    RemoveMedicine,
    ListMedicines
}
