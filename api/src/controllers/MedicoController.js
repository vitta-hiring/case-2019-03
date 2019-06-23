const MedicoService = require('../services/MedicoService');

module.exports = {
    async findall(req, res){
        try {
          const medicos = await MedicoService.findAll();
          return res.json(medicos);
        } catch (error) {
          res.status(error.status).send({
            message: error.message,
            data: error
          });
        }
    },

    async find(req, res){
        let id = req.params.id;
        if (!id)
          throw new Error('Parâmetro não informado.');

        try {
          const medico = await MedicoService.findByPk(id);
          return res.json(medico);
        } catch (error) {
          res.status(error.status).send({
            message: error.message,
            data: error
          });
        }
    },

    async post(req, res){
      try {
        await MedicoService.create(req.body);
        return res.json(req.body);
      } catch (error) {
        res.status(error.status).send({
          message: error.message,
          data: error
        });
      }
    },

    async update(req, res){
        let _id = req.params.id;
        if (!_id)
            throw new Error('Parâmetro não informado.');

        try {
          const medico = await MedicoService.update(req.body, {where: {id: _id} });
          return res.json(medico);
        } catch (error) {
          res.status(error.status).send({
            message: error.message,
            data: error
          });
        }
    }
}