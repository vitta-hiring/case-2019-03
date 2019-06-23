'use strict'

const models = require('../models');

exports.findAll = async() => {
    return await models.Paciente.findAll();
}

exports.find = async(id) => {
    return await models.Paciente.findByPk(id);
}

exports.create = async(obj) => {
    return await models.Paciente.create(obj);
}

exports.update = async(_id, obj) => {
    return await models.Paciente.update(obj, {where: {id: _id}});
}


