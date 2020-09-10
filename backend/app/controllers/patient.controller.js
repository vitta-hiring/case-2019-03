const db = require("../models");
const Patient = db.patient;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { patient } = require("../models");

exports.post = (req, res) => {
  // Save Patient to Database
  Patient.create({
      name: req.body.name
  })
      .then(patient => {
          if (!patient) {
              return res.status(500).send({ message: "Patient not registered successfully" });
          }
          res.status(200).send({
              id: patient.id,
              name: patient.name
          });
      })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
};

exports.findOne = (req, res) => {
  Patient.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(patient => {
      if (!patient) {
        return res.status(404).send({ message: "Patient Not found." });
      }

      res.status(200).send({
        id: patient.id,
        name: patient.name
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteOne = (req, res) => {
  Patient.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(patient => {
      if (!patient) {
        return res.status(404).send({ message: "Patient Not found." });
      }
      return res.status(404).send({ message: "Patient successfully deleted" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Patient.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients."
      });
    });
};