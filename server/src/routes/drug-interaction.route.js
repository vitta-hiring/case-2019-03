(() => {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const controller = require('../controllers/drug-interaction.controller');

  router.get('/', controller.get);
  router.get('/active/:active', controller.getByPrinciple);
  router.get('/first-active/:active', controller.getByFirstPrinciple);
  router.get('/seccond-active/:active', controller.getBySeccondPrinciple);
  router.post('/', controller.post);
  router.put('/:id', controller.put);
  router.delete('/', controller.delete);

  module.exports = router;
})();
