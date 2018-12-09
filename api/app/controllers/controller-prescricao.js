'use strict'

 const prescricaoervice = require('../services/service-prescricao');


 exports.create = async(req, res, next) => {
    try {

        const data = await prescricaoervice.create(req.body);
        

        res.status(200).send(data);   

    } catch (error) {
        res.status(error.status).send({
            message: error.message,
            data: error
        });
    }
};


exports.getByPaciente = async(req, res, next) => {
    try {
        

        const data = await prescricaoervice.getByPaciente(req.params.id);
        
        res.status(200).send(data);   

    } catch (error) {
        res.status(error.status).send({
            message: error.message,
            data: error
        });
    }
};