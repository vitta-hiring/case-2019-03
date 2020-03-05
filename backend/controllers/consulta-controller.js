'use strict'
const repository = require('../repositories/consulta-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const _repo = new repository();

function consultaController(){
  consultaController.prototype.post = async (req,res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.dataConsulta," dataConsulta is required");   
    _validationContract.isRequired(req.body.paciente," paciente is required");   
    _validationContract.isRequired(req.body.medicamentos," medicamentos is required");   
    _validationContract.isRequired(req.body.medico," medico is required");   
   ctrlBase.post(_repo,_validationContract,req,res);
  };
  consultaController.prototype.put = async (req, res) => {
    let _validationContract = new validation();
     _validationContract.isRequired(req.params.id, "Please inform your id consulta");
    ctrlBase.put(_repo, _validationContract, req, res);
  };
  consultaController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
  };
  consultaController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
  };
  consultaController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
  };
  consultaController.prototype.getMy = async (req, res) => {
    try {
      let id = req.params.id;
      let type = req.params.type;
      if (id && type) {
        let result = await _repo.getMy(id,type);
        res.status(200).send(result);
      } else {
        res.status(400).send({ message: "id and type are required" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error: error });
    }
    };
}
module.exports = consultaController;