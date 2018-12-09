'use strict'

const { Pacientes } = require('../models');

 exports.get = async() => {

    return await  Pacientes.findAll();
    
}; 