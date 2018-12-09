'use strict'
const appError = require('../util/appError');

const { Medico } = require('../models');

 exports.get = async() => {

    return await  Medico.findAll();
    
}; 

exports.getById = async(id) => {

    return await  Medico.findById(id).then(medico => {

        if(!medico)
        {
            throw new appError("Registro nao encontrado", 404);
        }
       
        return medico;
    });
    
};


exports.deleteById = async(id) => {

    return await  Medico.destroy({
        where: {
          id: id
        }
      });
    
}; 