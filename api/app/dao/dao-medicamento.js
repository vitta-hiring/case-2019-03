'use strict'
const Op =  require('sequelize').Op;

const { Medicamentos } = require('../models');

 exports.get = async() => {

    return await  Medicamentos.findAll();
    
}; 

exports.getFamacos = async(ids) => {

    return await  Medicamentos.findAll({ attributes: ['Farmacos'],
        where: {
            id : {
            [Op.in]: ids
          }
        }
      });
    
}; 


