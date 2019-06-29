'use strict'

const repository = require('../repository/MedicamentoRep');

exports.findAll = async() => {
    return await models.Medicamento.findAll();
}

exports.find = async(_id) => {
    return await repository.findByPk(id);
}

exports.create = async(obj) => {
    return await repository.create(obj);
}

exports.update = async(_id, obj) => {
    return await repository.update(_id, obj);
}