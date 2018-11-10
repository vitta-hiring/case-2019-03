(() => {
  'use strict';

  const repository = require('../repositories/drug-interaction.repository');

  exports.get = async (req, res, next) => {
    try {
      const data = await repository.get();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

  exports.getByFirstPrinciple = async (req, res, next) => {
    try {
      const data = await repository.getByFirstPrinciple(req.params.active);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

  exports.getByPrinciple = async (req, res, next) => {
    try {
      let data = [];
      const first_active_principle = await repository.getByFirstPrinciple(req.params.active);
      const seccond_active_principle = await repository.getBySeccondPrinciple(req.params.active);
      data = first_active_principle.concat(seccond_active_principle)
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

  exports.getBySeccondPrinciple = async (req, res, next) => {
    try {
      const data = await repository.getBySeccondPrinciple(req.params.active);
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
      await repository.create(req.body);
      res.status(201).send({
        message: 'Interação medicamentosa salva com sucesso!'
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
      await repository.update(req.params.id, req.body);
      res.status(201).send({
        message: 'Interação medicamentosa atualizada com sucesso!'
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
        message: 'Interação medicamentosa removida com sucesso!'
      });
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

})();
