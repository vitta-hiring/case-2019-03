import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
    setMedicine: ['set_medicine']
})

const INITIAL_STATE = {
    medicines: []
}

const handleMedicine = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        medicines: action.set_medicine
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.SET_MEDICINE]: handleMedicine
})
