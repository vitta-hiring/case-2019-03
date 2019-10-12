import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
    setDoctor: ['set_doctor']
})

const INITIAL_STATE = {
    doctors: []
}

const handleDoctor = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        doctors: action.set_doctor
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.SET_DOCTOR]: handleDoctor
})
