'use strict'
const Op = require('sequelize').Op;

const { Prescricoes } = require('../models');
const { Prescricoes_Medicamentos } = require('../models');

exports.create = async (obj) => {
	return await Prescricoes.create(obj)
    .then(prescricao => {
        obj.Medicamentos_Id.forEach(item => {
		    Prescricoes_Medicamentos.create({Prescricao_Id : prescricao.id , Medicamento_Id : item});
        });
        return prescricao;
    });
}

exports.findAll = async () => {
	return await Prescricoes.findAll();
}

exports.find = async (id) => {
	return await Prescricoes.findByPk(id);
}