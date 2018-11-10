(() => {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const controller = require('../controllers/medication.controller');

  router.get('/', controller.get);
  router.get('/:slug', controller.getBySlug);
  router.get('/admin/:id', controller.getById);
  router.get('/active_principles/:active_principles', controller.getByPrinciples);
  router.post('/', controller.post);
  router.put('/:id', controller.put);
  router.delete('/', controller.delete);

  module.exports = router;
})();
