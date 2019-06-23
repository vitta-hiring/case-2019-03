'use strict'

const models = require('../models');

exports.findAll = async() => {
    return await models.Medico.findAll();
}

exports.find = async(id) => {
    return await models.Medico.findByPk(id);
}

exports.create = async(obj) => {
    return await models.Medico.create(obj);
}

exports.update = async(_id, obj) => {
    return await models.Medico.update(obj, {where: {id: _id}});
}