const service = require('../services/PacienteService');

module.exports = {
  async findall(req, res) {
    try {
      const result = await service.findAll();
      return res.json(result);
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        data: error
      });
    }
  },

  async find(req, res) {
    let id = req.params.id;
    if (!id)
      throw new Error('Parâmetro não informado.');

    try {
      const result = await service.find(id);
      return res.json(result);
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        data: error
      });
    }
  },

  async post(req, res) {
    try {
      await service.create(req.body);
      return res.json(req.body);
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        data: error
      });
    }
  },

  async update(req, res) {
    let _id = req.params.id;
    if (!_id)
      throw new Error('Parâmetro não informado.');

    try {
      const result = await service.update(id, req.body);
      return res.json(result);
      
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        data: error
      });
    }
  }
};