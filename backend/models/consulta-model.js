'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const consultaModel = new schema({
  paciente:{type:ObjectId,ref: "User",required:true},
  medico:{type:ObjectId,ref: "User",required:true},
  medicamentos: [
    {
      nome: String,
      id_medicamento: { type: ObjectId, ref: "Medicamento" }
    }
  ],
  dataConsulta:{type:Date,default:Date.now},
  creationDate:{type:Date,default:Date.now}
},{versionKey:false});

consultaModel.pre("save",next => {
  let now = new Date();
  if(!this.creationDate){
    this.creationDate = now;
  }
  next();
});

module.exports = mongoose.model("Consulta",consultaModel);