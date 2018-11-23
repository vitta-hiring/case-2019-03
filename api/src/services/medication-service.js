'use strict'

const repositoryMedication = require('../repositories/medication-repository');
const repositoryInterventionMedication = require('../repositories/medication-interventional-repository');

exports.getMedications = async() => {
    return await repositoryMedication.get();
};

exports.getInterventionMedications = async() => {
    return await repositoryInterventionMedication.get();
};

exports.checkMedicationIntervention = async( medications ) => {
    return await repositoryInterventionMedication.checkMedicationIntervention(medications);
}
