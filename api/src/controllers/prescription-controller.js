'use strict'

const service = require('../services/prescription-service');
const serviceMedication = require('../services/medication-service');
const ValidationContract = require('../validators/fluent-validator');

exports.get = async(req, res, next) => {
    try {
        let data = await service.get();
        res.status(200).send(data);   
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisicao',
            data: error
        });
    }
};

exports.getPrescriptionsByPatientId = async(req, res, next) => {

    let validation = new ValidationContract();
    validation.isRequired(req.params.id, "Id do paciente é obrigatorio!")

    if(!validation.isValid()){
        res.status(400).send(validation.errors()).end();
        return;
    }

    try {
        let data = await service.getPrescriptionsByPatientId(req.params.id);
        res.status(200).send(data);   
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisicao',
            data: error
        });
    }
};


exports.getMedicationPrescription = async(req, res, next) => {

    let validation = new ValidationContract();
    validation.isRequired(req.params.id, "Id da prescricao é obrigatorio!")

    if(!validation.isValid()){
        res.status(400).send(validation.errors()).end();
        return;
    }

    try {
        let data = await service.getMedicationPrescription(req.params.id);
        res.status(200).send(data);   
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisicao',
            data: error
        });
    }
};

exports.createPrescription = async(req, res, next) => {

    let validation = new ValidationContract();
    validation.isRequired(req.body.description, "Descricao da prescricao é obrigatoria!");
    validation.isRequired(req.body.patient_id, "Informe o paciente!");
    validation.isRequired(req.body.doctor_id, "Informe o medico!");
    validation.isRequired(req.body.medications, "Nao é possivel adicionar uma prescricao sem medicamentos!");

    if(!validation.isValid()){
        res.status(400).send(validation.errors()).end();
        return;
    }

    if(req.body.ignore == false) {
        let validationMedications = await serviceMedication.checkMedicationIntervention(req.body.medications);
       
        if(validationMedications.length > 0){
            res.status(409).send(validationMedications);   
            return;
        }
    }

    try {
        let data = await service.createPrescription(req.body);
        res.status(200).send(data);   
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao salvar sua prescricao',
            data: error
        });
    }
}
