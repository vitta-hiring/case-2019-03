const db = require("../models");
const config = require("../config/auth.config");
const Pharmaco = db.pharmaco;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { pharmaco } = require("../models");

exports.post = (req, res) => {
    // Save Pharmaco to Database
    Pharmaco.create({
        id: req.body.id,
        name: req.body.name
    })
        .then(pharmaco => {
            if (!pharmaco) {
                return res.status(500).send({ message: "Pharmaco not registered successfully" });
            }
            res.status(200).send({
                id: pharmaco.id,
                name: pharmaco.name
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findOne = (req, res) => {
    Pharmaco.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(pharmaco => {
            if (!pharmaco) {
                return res.status(404).send({ message: "Pharmaco Not found." });
            }
            res.status(200).send({
                id: pharmaco.id,
                name: pharmaco.name
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