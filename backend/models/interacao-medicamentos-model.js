'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const interacaomedicamentosModel = new schema({
  nome:{trim:true,index:true,required:true,type:String},
  farmaco1:{type:String,required:true},
  farmaco2:{type:String,required:true},
  medicamentos1: [
    {
      nome: String,
      id_medicamento: { type: ObjectId, ref: "Medicamento" }
    }
  ],
  medicamentos2: [
    {
      nome: String,
      id_medicamento: { type: ObjectId, ref: "Medicamento" }
    }
  ],
  descricao:{type:String,required:true},
  creationDate:{type:Date,default:Date.now}
},{versionKey:false});

interacaomedicamentosModel.pre("save",next => {
  let now = new Date();
  if(!this.creationDate){
    this.creationDate = now;
  }
  next();
});

module.exports = mongoose.model("InteracaoMedicamentos",interacaomedicamentosModel);