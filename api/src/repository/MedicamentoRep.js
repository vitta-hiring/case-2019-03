'use strict'
const Op =  require('sequelize').Op;

const { Medicamento } = require('../models');

exports.findFarmacos = async(ids) => {
    return await  Medicamento.findAll({ attributes: ['Farmacos'],
        where: { id : { [Op.in]: ids } }
    });
}; 

exports.findAll = async() => {
    return await Medicamento.findAll();
}

exports.find = async(_id) => {
    return await Medicamento.findByPk(id);
}

exports.create = async(obj) => {
    return await Medicamento.create(obj);
}

exports.update = async(_id, obj) => {
    return await Medicamento.update(obj, {where: {id: _id}});
}