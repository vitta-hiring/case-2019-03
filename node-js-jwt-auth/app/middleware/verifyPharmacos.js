const db = require("../models");
const Pharmaco = db.pharmaco;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

checkPharmacosExisted = (req, res, next) => {
    Pharmaco.findAll({}).then(pharmacos => {
        namesPharmacos = [];
        pharmacos.forEach(pharmaco => {
            namesPharmacos.push(pharmaco.dataValues.name);
        });
        if (req.body.pharmacos) {
            for (let i = 0; i < req.body.pharmacos.length; i++) {
                console.log(req.body.pharmacos[i]);
                if (!namesPharmacos.includes(req.body.pharmacos[i])) {
                    // console.log(pharmacos);
                    res.status(400).send({
                        message: "Failed! Pharmaco does not exist = " + req.body.pharmacos[i]
                    });
                    return;
                }
            }
            next();
        }
    });
};

const verifyPharmacos = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkPharmacosExisted: checkPharmacosExisted
};

module.exports = verifyPharmacos;
