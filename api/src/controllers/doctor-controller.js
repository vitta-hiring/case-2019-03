'use strict'

const service = require('../services/doctor-service');

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
