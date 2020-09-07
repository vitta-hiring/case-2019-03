const db = require("../models");
const config = require("../config/auth.config");
const MedicalInteraction = db.medicalInteraction;
const Pharmaco = db.pharmaco;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { medicalInteraction, pharmaco } = require("../models");

exports.post = (req, res) => {
  // Save MedicalInteraction to Database
  MedicalInteraction.create({
    name: req.body.name,
    description: req.body.description,
    pharmacos: req.body.pharmacos
  })
    .then(medicalInteraction => {
      if (req.body.pharmacos) {
        Pharmaco.findAll({
          where: {
            name: {
              [Op.or]: req.body.pharmacos
            }
          }
        }).then(pharmacos => {
          if (req.body.pharmacos.length != pharmacos.length) {
            return res.status(404).send({ message: "All pharmacos must exist at the base!" });
          } else {
            medicalInteraction.setPharmacos(pharmacos).then(() => {
              res.send({ message: "Medical Interaction registered successfully!" });
            });
          }
        });
      } else {
        return res.status(404).send({ message: "Pharmacos not defined." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  MedicalInteraction.findOne({
    where: {
      id: req.body.id
    },
    include: "pharmacos"
  })
    .then(medicalInteraction => {
      if (!medicalInteraction) {
        return res.status(404).send({ message: "Medication Not found." });
      }
      res.status(200).send({
        id: medicalInteraction.id,
        name: medicalInteraction.name,
        description: medicalInteraction.description,
        pharmacos: medicalInteraction.pharmacos
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteOne = (req, res) => {
  MedicalInteraction.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(medicalInteraction => {
      if (!medicalInteraction) {
        return res.status(404).send({ message: "Medical Interaction Not found." });
      }
      return res.status(404).send({ message: "Medical Interaction successfully deleted" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};