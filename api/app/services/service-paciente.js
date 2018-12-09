'use strict'
 const dao = require('../dao/dao-paciente');
 exports.get = async() => {

 
    return await dao.get();
};