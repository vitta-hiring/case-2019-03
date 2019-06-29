'use strict'

const service = require('../services/PrescricaoService');

module.exports = {
  async post(req, res){
    try {
      const result = await service.create(req.body);
      return res.json(result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: error
      });
    }
  } 
};