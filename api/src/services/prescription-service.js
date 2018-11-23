'use strict'

const repository = require('../repositories/prescription-repository');

exports.get = async() => {
    return await repository.get();
};

exports.getMedicationPrescription = async(prescription_id) => {
    return await repository.getMedicationPrescription(prescription_id);
}

exports.createPrescription = async(data) => {

    var prescription = {};
    prescription.description =  data.description;
    prescription.patient_id =  data.patient_id;
    prescription.doctor_id = data.doctor_id;

    return repository.createPrescription(prescription).then(res => {
        
        data.medications.forEach(element => {
            var medi = {};
            medi.prescription_id =  res[0];
            medi.medication_id =  element;
            repository.createPrescriptionMedications(medi);
        });

        return {
            message: 'Prescricao criada com sucesso!'
        }
    });

    

}

