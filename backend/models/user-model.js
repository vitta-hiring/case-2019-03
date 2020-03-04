'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const userModel = new schema({
  name:{trim:true,index:true,required:true,type:String},
  email:{type:String,required:true},
  type:{type:String,default:"patient"},
  password:{type:String,required:true},
  creationDate:{type:Date,default:Date.now}
},{versionKey:false});

userModel.pre("save",next => {
  let now = new Date();
  if(!this.creationDate){
    this.creationDate = now;
  }
  next();
});

module.exports = mongoose.model("User",userModel);