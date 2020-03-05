'use strict'
const repository = require('../repositories/interacao-medicamentos-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const _repo = new repository();

function interacaomedicamentosController(){
  interacaomedicamentosController.prototype.post = async (req,res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome," nome is required");   
    _validationContract.isRequired(req.body.farmaco1," farmaco1 is required");   
    _validationContract.isRequired(req.body.farmaco2," farmaco2 is required");   
    _validationContract.isRequired(req.body.medicamentos1," medicamentos1 is required");   
    _validationContract.isRequired(req.body.medicamentos2," medicamentos2 is required");   
    _validationContract.isRequired(req.body.descricao," concentracao is required");   
   ctrlBase.post(_repo,_validationContract,req,res);
  };
  interacaomedicamentosController.prototype.put = async (req, res) => {
    let _validationContract = new validation();
     _validationContract.isRequired(req.params.id, "Please inform your id interacaomedicamentos");
    ctrlBase.put(_repo, _validationContract, req, res);
  };
  interacaomedicamentosController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
  };
  interacaomedicamentosController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
  };
  interacaomedicamentosController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
  };
}
module.exports = interacaomedicamentosController;