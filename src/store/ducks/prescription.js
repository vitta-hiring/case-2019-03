import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
    setPrescription: ['set_prescription']
})

const INITIAL_STATE = {
    prescriptions: []
}

const handlePrescription = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        prescriptions: action.set_prescription
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.SET_PRESCRIPTION]: handlePrescription
})
