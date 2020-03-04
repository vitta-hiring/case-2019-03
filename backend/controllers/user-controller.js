'use strict'
const repository = require('../repositories/user-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
const _repo = new repository();

function userController(){
  userController.prototype.post = async (req,res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.name,"Please inform your name");
    _validationContract.isRequired(req.body.type,"Please inform your type");
    _validationContract.isRequired(req.body.email,"Please inform your email");
    _validationContract.isRequired(req.body.password,"Please inform your password");
    _validationContract.isRequired(req.body.passwordConfirmation,"Please confirm your password");
    _validationContract.isEmail(req.body.email,"Please inform a valid email");
    _validationContract.isTrue(req.body.password != req.body.passwordConfirmation,"Please enter with two passwords equals");
   try{
   let userEmailExists = await _repo.IsEmailExists(req.body.email);
   if(userEmailExists){
     _validationContract.isTrue(userEmailExists.name != undefined,`Email ${req.body.email} registered yet`);
     res.status(500).send(`Email ${req.body.email} registered yet`);
    }
   var salt = await bcrypt.genSaltSync(10);
   req.body.password = await bcrypt.hashSync(req.body.password,salt);
   ctrlBase.post(_repo,_validationContract,req,res);
   } catch(err){
     res.status(500).send({message:"Internal server error",error:err});
   }
  };
  userController.prototype.put = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.name, "Please inform your name");
    _validationContract.isRequired(req.params.id, "Please inform your id user");
    if(req.body.email){
      _validationContract.isEmail(req.body.email, "Invalid email");
      let userEmailExists = await _repo.IsEmailExists(req.body.email);
      if (userEmailExists) {
        if (req.body.email !== req.userLogged.user.email) {
          if (userEmailExists._id !== req.usuarioLogado.user._id) {
            _validationContract.isTrue(
              userEmailExists.name != undefined &&
              userEmailExists._id != req.params.id,
              `Email ${req.body.email} registered yet`
            );
        }
      }
    }
    }
    ctrlBase.put(_repo, _validationContract, req, res);
  };
  userController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
  };
  userController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
  };
  userController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
  };
  userController.prototype.authenticate = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.email,"Please inform your email");
    _validationContract.isRequired(req.body.password,"Please inform your password");
    _validationContract.isEmail(req.body.email, "Invalid email");
    if (!_validationContract.isValid()) {
      res.status(400).send({
        message: "Login failed",
        validation: _validationContract.errors()
      });
      return;
    }
    let userAux = await _repo.authenticate(
      req.body.email,
      req.body.password
    );
    if (userAux === null) {
      res
        .status(404)
        .send({ message: "Invalid user or password" });
    }
    if (userAux) {
        res.status(200).send({
          user: userAux,
          token: jwt.sign({ user: userAux }, variables.Security.secretKey)
        });
    } else {
      res
        .status(404)
        .send({ message: "Invalid user or password" });
    }
  };
}
module.exports = userController;