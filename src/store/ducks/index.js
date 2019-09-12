import { combineReducers } from 'redux'

import doctorState from './doctor'
import medicineState from './medicine'
import patientState from './patient'
import prescriptionState from './prescription'

export default combineReducers({
    doctorState,
    medicineState,
    patientState,
    prescriptionState
})
