'use strict'
const Op =  require('sequelize').Op;

const { Medico } = require('../models');

exports.findAll = async() => {
  return await Medico.findAll();
}

exports.find = async(id) => {
  return await Medico.findByPk(id);
}

exports.create = async(obj) => {
  return await Medico.create(obj);
}

exports.update = async(_id, obj) => {
  return await Medico.update(obj, {where: {id: _id}});
}