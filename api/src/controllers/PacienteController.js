const PacienteService = require('../services/PacienteService');

module.exports = {
  async findall(req, res) {
    try {
      const pacientes = await PacienteService.findAll();
      return res.json(pacientes);
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
      const paciente = await PacienteService.find(id);
      return res.json(paciente);
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        data: error
      });
    }
  },

  async post(req, res) {
    try {
      await PacienteService.create(req.body);
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
      const paciente = await PacienteService.update(id, req.body);
      return res.json(paciente);
      
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        data: error
      });
    }
  }
};