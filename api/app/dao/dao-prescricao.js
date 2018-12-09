'use strict'

const { Prescricoes } = require('../models');
const { Prescricoes_Medicamentos } = require('../models');
const appError = require('../util/appError');

 exports.create = async(data) => {

    return await Prescricoes.create({Nome : data.Nome ,Paciente_Id : data.Paciente_Id, Medico_Id : data.Medico_Id })
    .then(prescricao => {

        data.Medicamentos_Id.forEach(element => {
            Prescricoes_Medicamentos.create({Prescricao_Id : prescricao.id , Medicamento_Id : element});
        });
       
        return prescricao;
    });
    
    
};

exports.getByPaciente = async(Paciente_Id) => {
    return await Prescricoes.findAll({ where: {Paciente_Id: Paciente_Id}, order: [
        ['createdAt', 'ASC']
    ], include : [ {all : true}]  }).then(prescricao => {

        if(prescricao.length == 0)
        {
            throw new appError("Registro nao encontrado", 404);
        }
       
        return prescricao;
    });
}; 

exports.getPrecricaoMedicamentos = async(Precricao_Id) => {
    return await Prescricoes_Medicamentos.findAll({ where: {Prescricao_Id: Precricao_Id}, order: [
        ['createdAt', 'ASC']
    ], include : [ {all : true}]  }).then(prescricoes_medicamentos => {

        if(prescricoes_medicamentos.length == 0)
        {
            throw new appError("Registro nao encontrado", 404);
        }
       
        return prescricoes_medicamentos;
    });
}; 

