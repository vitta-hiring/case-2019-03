const db = require("../models");
const Doctor = db.doctor;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { doctor } = require("../models");

exports.post = (req, res) => {
  // Save Doctor to Database
  Doctor.create({
      name: req.body.name
  })
      .then(doctor => {
          if (!doctor) {
              return res.status(500).send({ message: "Doctor not registered successfully" });
          }
          res.status(200).send({
              id: doctor.id,
              name: doctor.name
          });
      })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
};

exports.findOne = (req, res) => {
  Doctor.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(doctor => {
      if (!doctor) {
        return res.status(404).send({ message: "Doctor Not found." });
      }

      res.status(200).send({
        id: doctor.id,
        name: doctor.name
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteOne = (req, res) => {
  Doctor.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(doctor => {
      if (!doctor) {
        return res.status(404).send({ message: "Doctor Not found." });
      }
      return res.status(404).send({ message: "Doctor successfully deleted" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Doctor.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving doctors."
      });
    });
};