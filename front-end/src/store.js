import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import card from './stores/card';
import prescriptions from './stores/prescriptions';
import medicines from './stores/medicines';
import interactions from './stores/interactions';

export default new Vuex.Store({
    state: {
        ...card,
        ...prescriptions,
        ...medicines,
        ...interactions
    },
    getters: {
        getPrescriptionById: state => id => {
            return state.prescriptions.find(prescription => prescription.id === id);
        }
    },
    mutations: {
        addPrescription(state, payload) {
            state.prescriptions.unshift(payload);
        }
    },
    actions: {}
});
