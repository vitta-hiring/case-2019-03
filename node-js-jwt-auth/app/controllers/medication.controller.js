const db = require("../models");
const config = require("../config/auth.config");
const Medication = db.medication;
const Pharmaco = db.pharmaco;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { medication, pharmaco } = require("../models");

exports.post = (req, res) => {
  // Save Medication to Database
  // medication_pharmacos
  Medication.create({
    id: req.body.id,
    name: req.body.name,
    pharmacos: req.body.pharmacos,
    concentration: req.body.concentration,
    unit: req.body.unit,
    medicationType: req.body.medicationType,
    pharmaceuticalForm: req.body.pharmaceuticalForm,
    viaAdministrative: req.body.viaAdministrative,
    atcCode: req.body.atcCode,
    internalUse: req.body.internalUse,
    antimicrobial: req.body.antimicrobial,
    bula: req.body.bula,
    ordinance344: req.body.ordinance344,
    specialCenter: req.body.specialCenter,
    tiss: req.body.tiss,
    mip: req.body.mip,
    label: req.body.label,
    unified: req.body.unified
  })
    .then(medication => {
      if (req.body.pharmacos) {
        console.log(req.body.pharmacos);
        console.log(req.body.pharmacos.length);
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
            medication.setPharmacos(pharmacos).then(() => {
              res.send({ message: "Medication registered successfully!" });
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
  Medication.findOne({
    where: {
      name: req.body.name
    },
    include: "pharmacos"
  })
    .then(medication => {
      // console.log(medication);
      if (!medication) {
        return res.status(404).send({ message: "Medication Not found." });
      }

      res.status(200).send({
        id: medication.id,
        name: medication.name,
        pharmacos: medication.pharmacos,
        concentration: medication.concentration,
        unit: medication.unit,
        medicationType: medication.medicationType,
        pharmaceuticalForm: medication.pharmaceuticalForm,
        viaAdministrative: medication.viaAdministrative,
        atcCode: medication.atcCode,
        internalUse: medication.internalUse,
        antimicrobial: medication.antimicrobial,
        bula: medication.bula,
        ordinance344: medication.ordinance344,
        specialCenter: medication.specialCenter,
        tiss: medication.tiss,
        mip: medication.mip,
        label: medication.label,
        unified: medication.unified
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteOne = (req, res) => {
  Pharmaco.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(pharmaco => {
      if (!pharmaco) {
        return res.status(404).send({ message: "Pharmaco Not found." });
      }
      return res.status(404).send({ message: "Pharmaco successfully deleted" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};