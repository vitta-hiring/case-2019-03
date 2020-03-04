'use strict'
const repository = require('../repositories/medicamento-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const _repo = new repository();

function medicamentoController(){
  medicamentoController.prototype.post = async (req,res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome," nome is required");   
    _validationContract.isRequired(req.body.concentracao," concentracao is required");   
    _validationContract.isRequired(req.body.farmacos," farmacos is required");   
    _validationContract.isRequired(req.body.unidade,"    unidade is required");
    _validationContract.isRequired(req.body.tipoMedicamento,"    tipoMedicamento is required");
    _validationContract.isRequired(req.body.formaFarmaceutica,"  formaFarmaceutica is required");  
    _validationContract.isRequired(req.body.viaAdministracao,"   viaAdministracao is required"); 
    _validationContract.isRequired(req.body.codigoATC,"   codigoATC is required"); 
    _validationContract.isRequired(req.body.usoInterno,"  usoInterno is required");
    _validationContract.isRequired(req.body.antimicrobiano,"    antimicrobiano is required");
    _validationContract.isRequired(req.body.bula,"   bula is required"); 
    _validationContract.isRequired(req.body.portaria344,"portaria344 is required");    
    _validationContract.isRequired(req.body.tiss,"   tiss is required"); 
    _validationContract.isRequired(req.body.label,"    label is required");
   ctrlBase.post(_repo,_validationContract,req,res);
  };
  medicamentoController.prototype.put = async (req, res) => {
    let _validationContract = new validation();
     _validationContract.isRequired(req.params.id, "Please inform your id medicamento");
    ctrlBase.put(_repo, _validationContract, req, res);
  };
  medicamentoController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
  };
  medicamentoController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
  };
  medicamentoController.prototype.getByFarmaco = async (req, res) => {
    try {
      let farmaco = req.params.farmaco;
      if (farmaco) {
        let result = await _repo.getByFarmaco(farmaco);
        res.status(200).send(result);
      } else {
        res.status(400).send({ message: "farmaco required" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error: error });
    }
    };
  medicamentoController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
  };
}
module.exports = medicamentoController;