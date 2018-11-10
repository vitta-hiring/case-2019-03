(() => {
  'use strict';

  const repository = require('../repositories/medication.repository');

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

  exports.getBySlug = async (req, res, next) => {
    try {
      const data = await repository.getBySlug(req.params.slug)
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

  exports.getById = async (req, res, next) => {
    try {
      const data = await repository.getById(req.params.id)
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

  exports.getByPrinciples = async (req, res, next) => {
    try {
      const data = await repository.getByPrinciples(req.params.active_principles)
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
        message: 'Medicação salva com sucesso!'
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
      await repository.update(req.params.id, req.body.name)
      res.status(201).send({
        message: 'Medicação atualizada com sucesso!'
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
        message: 'Medicação removida com sucesso!'
      });
    } catch (error) {
      res.status(500).send({
        message: 'Falha ao processar requisição!',
        data: error
      });
    }
  };

})();
