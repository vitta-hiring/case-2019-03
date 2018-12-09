'use strict'
 const dao = require('../dao/dao-medicamento');
 exports.get = async() => {
    return await dao.get();
};

exports.getByIds = async(ids) => {
    return await dao.getByIds(ids);
};

