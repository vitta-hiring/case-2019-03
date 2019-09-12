import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
    setPatient: ['set_patient']
})

const INITIAL_STATE = {
    patients: []
}

const handlePatient = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        patients: action.set_patient
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.SET_PATIENT]: handlePatient
})
