'use strict'
 const dao = require('../dao/dao-medico');
 exports.get = async() => {
    return await dao.get();
};


exports.getById = async(id) => {
    return await dao.getById(id);
};

exports.deleteById = async(id) => {
    return await dao.deleteById(id);
};