'use strict'
const Op = require('sequelize').Op;

const { Interacao_Medicamentosa } = require('../models');

exports.findInteracaoMedicamentosa = async (obj) => {
	return await Interacao_Medicamentosa.findAll({
		where: {
			Farmaco1: {
				[Op.in]: obj
			},
			Farmaco2: {
				[Op.in]: obj
			}
		}
	});
};

exports.findAll = async() => {
	return await Interacao_Medicamentosa.findAll();
}

exports.find = async(id) => {
	return await Interacao_Medicamentosa.findByPk(id);
}

exports.create = async(obj) => {
	return await Interacao_Medicamentosa.create(obj);
}

exports.update = async(_id, obj) => {
	return await Interacao_Medicamentosa.update(obj, {where: {id: _id}});
}
