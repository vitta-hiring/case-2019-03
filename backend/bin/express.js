require('dotenv').config;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');
const userRouter = require('../routes/user-router');
const medicamentoRouter = require('../routes/medicamento-router');
const interacaomedicamentosRouter = require('../routes/interacao-medicamentos-router');
const consultaRouter = require('../routes/consulta-router');
const morgan = require('morgan');
const app = express();

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin",req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods","GET,POST,PUT,HEAD,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers","Content-Type,x-requested-with,Authorization");
  next();
});

require('./extraConfig')(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan("dev"));
module.exports = app;

mongoose.connect(variables.Database.connection,{ useNewUrlParser: true});

app.use("/api/user",userRouter);
app.use("/api/medicamento",medicamentoRouter);
app.use("/api/interacaomedicamentos",interacaomedicamentosRouter);
app.use("/api/consulta",consultaRouter);
