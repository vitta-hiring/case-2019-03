const service = require('../services/medication-service');

exports.getMedications = async(req, res, next) => {
    try {
        let data = await service.getMedications();
        res.status(200).send(data);   
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisicao',
            data: error
        });
    }
};

exports.getInterventionMedications = async(req, res, next) => {
    try {
        let data = await service.getInterventionMedications();
        res.status(200).send(data);   
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisicao',
            data: error
        });
    }
};

exports.checkMedicationIntervention = async(req, res, next) => {

    let validation = new ValidationContract();
    validation.isRequired(req.body.medications, "É necessario enviar os medicamentos para realizar a consulta!");

    if(!validation.isValid()){
        res.status(400).send(validation.errors()).end();
        return;
    }

    try {
        let data = await service.checkMedicationIntervention(req.body.medications);
        res.status(200).send(data);   
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisicao',
            data: error
        });
    }
};
