'use strict'

 const medicamentoservice = require('../services/service-medicamento');


 exports.get = async(req, res, next) => {
    try {
        
        const data = await medicamentoservice.get();

        res.status(200).send(data);   

    } catch (error) {
        res.status(500).send({
            message: 'Aconteceu uma falha na requisição',
            data: error
        });
    }


};