'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicamento-controller');
const auth = require('../middlewares/authentication');
let _ctrl = new controller();

router.post('/',auth,_ctrl.post);
router.get('/',auth,_ctrl.get);
router.get('/byFarmaco/:farmaco',auth,_ctrl.getByFarmaco);
router.get('/:id',auth,_ctrl.getById);
router.put('/:id',auth,_ctrl.put);
router.delete('/:id',auth,_ctrl.delete);

module.exports = router;