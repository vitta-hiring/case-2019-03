'use strict'
const Op =  require('sequelize').Op;

const { Interacao_Medicamentosa } = require('../models');

 exports.get = async() => {

    return await  Interacao_Medicamentosa.findAll();
    
}; 

exports.getInteracao = async(Farmacos) => {

    return await  Interacao_Medicamentosa.findAll({
        where: {
            Farmaco1 : {
            [Op.in]: Farmacos
          },
          Farmaco2 : {
            [Op.in]: Farmacos
          }
        }
      });
    
}; 


