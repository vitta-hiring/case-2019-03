'use strict'

const repository = require('../repository/InteracaoMedicamentosaRep');

exports.findAll = async() => {
    return await repository.findAll();
}

exports.find = async(id) => {
    return await repository.findByPk(id);
}

exports.create = async(obj) => {
    return await .repository.create(obj);
}

exports.update = async(_id, obj) => {
    return await repository.update(obj, {where: {id: _id}});
}