(() => {
  'use strict';

  const repository = require('../repositories/doctor-prescription.repository');

  exports.get = async (req, res, next) => {
    try {
      const data = await repository.get()
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

  exports.post = async (req, res, next) => {
    try {
      await repository.create(req.body)
      res.status(201).send({
        message: 'Prescrição médica salva com sucesso!'
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
      await repository.update(req.params.id, req.body)
      res.status(201).send({
        message: 'Prescrição médica atualizada com sucesso!'
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
      await repository.delete(req.body.id)
      res.status(200).send({
        message: 'Prescrição médica removida com sucesso!'
      });
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

})();
