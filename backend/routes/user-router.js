'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const auth = require('../middlewares/authentication');
let _ctrl = new controller();

router.post('/authenticate',_ctrl.authenticate);
router.post('/register',_ctrl.post);
router.get('/',auth,_ctrl.get);
router.get('/patients',auth,_ctrl.getPatients);
router.get('/byid/:id',auth,_ctrl.getById);
router.put('/:id',auth,_ctrl.put);
router.delete('/:id',auth,_ctrl.delete);

module.exports = router;