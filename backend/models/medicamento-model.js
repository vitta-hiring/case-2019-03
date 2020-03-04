'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const medicamentoModel = new schema({
  nome:{trim:true,index:true,required:true,type:String},
  concentracao:{type:String,required:true},
  unidade:{type:String,required:true},
  tipoMedicamento:{type:String,required:true},
  formaFarmaceutica:{type:String,required:true},
  viaAdministracao:{type:String,required:true},
  codigoATC:{type:String,required:true},
  usoInterno:{type:Boolean,required:true,default:true},
  antimicrobiano:{type:String,required:true},
  bula:{type:String,required:true},
  portaria344:{type:String,required:true},
  controleEspecial:{type:Boolean},
  tiss:{type:String,required:true},
  mip:{type:Boolean},
  label:{type:String,required:true},
  unificado:{type:String,default:null},
  farmacos: [
    {
      nome: String,
    }
  ],
  creationDate:{type:Date,default:Date.now}
},{versionKey:false});

medicamentoModel.pre("save",next => {
  let now = new Date();
  if(!this.creationDate){
    this.creationDate = now;
  }
  next();
});

module.exports = mongoose.model("Medicamento",medicamentoModel);