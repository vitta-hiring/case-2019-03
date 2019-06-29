'use strict'
const Op =  require('sequelize').Op;

const { Paciente } = require('../models');

exports.findAll = async() => {
  return await Paciente.findAll();
}

exports.find = async(id) => {
  return await Paciente.findByPk(id);
}

exports.create = async(obj) => {
  return await Paciente.create(obj);
}

exports.update = async(_id, obj) => {
  return await Paciente.update(obj, {where: {id: _id}});
}