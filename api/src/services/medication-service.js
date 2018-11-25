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
    const medicationsListName = await repositoryMedication.getNamesByListId(medications);

    let formatListMedications = [];
    medicationsListName.forEach(element => {
        formatListMedications.push( element.pharmacos.replace(",", " + "));
    });
   
    return await repositoryInterventionMedication.checkMedicationIntervention(formatListMedications);
}
