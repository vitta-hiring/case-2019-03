'use strict'

 const medicoservice = require('../services/service-medico');


 exports.get = async(req, res, next) => {
    try {
        
        const data = await medicoservice.get();

        res.status(200).send(data);   

    } catch (error) {
        res.status(error.status).send({
            message: error.message,
            data: error
        });
    }
};


exports.getById = async(req, res, next) => {
    try {
        
        const data = await medicoservice.getById(req.params.id);

        res.status(200).send(data);   

    } catch (error) {
        res.status(error.status).send({
            message: error.message,
            data: error
        });
    }
};exports.getById = async(req, res, next) => {
    try {
        
        const data = await medicoservice.getById(req.params.id);

        res.status(200).send(data);   

    } catch (error) {
        res.status(error.status).send({
            message: error.message,
            data: error
        });
    }
};


exports.deleteById = async(req, res, next) => {
    try {
        
        const data = await medicoservice.deleteById(req.params.id);

        res.status(200).send({"messagem" : "Registro excluido com sucesso" });   

    } catch (error) {
        res.status(error.status).send({
            message: error.message,
            data: error
        });
    }
};