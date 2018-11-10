(() => {
  'use strict';

  const ValidationContract = require('../validators/fluent.validator');
  const repository = require('../repositories/patient.repository');

  exports.get = async (req, res, next) => {
    try {
      const data = await repository.get();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome do paciente deve conter no mínimo 3 caracteres');

    if (!contract.isValid()) {
      res.status(400).send(contract.errors()).end();
      return;
    }

    try {
      await repository.create(req.body);
      res.status(201).send({
        message: 'Paciente criado com sucesso!'
      });
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

  exports.put = async (req, res, next) => {
    try {
      await repository.update(req.params.id, req.body.name);
      res.status(201).send({
        message: 'Paciente atualizado com sucesso!'
      });
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

  exports.delete = async (req, res, next) => {
    try {
      await repository.delete(req.body.id);
      res.status(200).send({
        message: 'Paciente removido com sucesso!'
      });
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

})();
