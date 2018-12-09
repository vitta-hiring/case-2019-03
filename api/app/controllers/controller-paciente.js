'use strict'

 const pacienteservice = require('../services/service-paciente');


 exports.get = async(req, res, next) => {
    try {
        
        console.log('teste');

        const data = await pacienteservice.get();
        

        res.status(200).send(data);   

    } catch (error) {
        res.status(500).send({
            message: 'Aconteceu uma falha na requisição',
            data: error
        });
    }
};