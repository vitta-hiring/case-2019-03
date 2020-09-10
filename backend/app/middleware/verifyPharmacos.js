const db = require("../models");
const { pharmaco } = require("../models");
const Pharmaco = db.pharmaco;
const Patient = db.patient;
const Doctor = db.doctor;
const MedicalInteraction = db.medicalInteraction;
const User = db.user;
var _ = require('underscore');
const Medication = db.medication;
const Op = db.Sequelize.Op;

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
                if (!namesPharmacos.includes(req.body.pharmacos[i])) {
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

createMedication = (req, res) => {
    // Save Medication to Database
    // medication_pharmacos
    Medication.create({
        name: req.body.name,
        pharmacos: req.body.pharmacos,
        patients: req.body.patients,
        doctors: req.body.doctors,
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
            if (req.body.pharmacos && req.body.patients && req.body.doctors) {
                addPharmacoToMedication(req, res, medication);
            } else {
                return res.status(404).send({ message: "Pharmacos, patients or doctors not defined." });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

addPharmacoToMedication = (req, res, medication) => {
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
                addPatientsToMedication(req, res, medication);
            });
        }
    });
}

addPatientsToMedication = (req, res, medication) => {
    Patient.findAll({
        where: {
            id: {
                [Op.or]: req.body.patients
            }
        }
    }).then(patients => {
        if (req.body.patients.length != patients.length) {
            return res.status(404).send({ message: "Patient must exist at the base!" });
        } else {
            medication.setPatients(patients).then(() => {
                addDoctorsToMedication(req, res, medication);
            });
        }
    });
}

addDoctorsToMedication = (req, res, medication) => {
    Doctor.findAll({
        where: {
            id: {
                [Op.or]: req.body.doctors
            }
        }
    }).then(doctors => {
        if (req.body.doctors.length != doctors.length) {
            return res.status(404).send({ message: "Doctor must exist at the base!" });
        } else {
            medication.setDoctors(doctors).then(() => {
                return res.send({ message: "Medication registered successfully!" });
            });
        }
    });
}

async function checkMedicalInteraction(req, res, next) {
    consolide = {};
    consolide.value = true;
    MedicalInteraction.findAll({
        include: "pharmacos"
    }).then(MI => {
        // PH = pharmacos
        // MI = medical interactions
        pharmacosFromMedicalInteraction = [];
        MI.forEach(MI => {
            tempPHfromMI = {};
            tempPHfromMI.id = MI.id;
            tempPHfromMI.name = MI.name;
            tempPHfromMI.description = MI.description;
            tempPHfromMI.pharmacos = [];
            MI.pharmacos.forEach(pharmaco => {
                tempPHfromMI.pharmacos.push({ name: pharmaco.dataValues.name });
            });
            pharmacosFromMedicalInteraction.push(tempPHfromMI);
        });
        if (req.body.pharmacos) {
            pharmacosFromRequest = req.body.pharmacos;
            tempPharmacosFromRequest = [];
            tempPharmaco = {};
            tempPharmaco.pharmacos = [];
            pharmacosFromRequest.forEach(pharmacoName => {
                tempPharmaco.pharmacos.push({ name: pharmacoName });
            });
            tempPharmacosFromRequest.push(tempPharmaco.pharmacos);
            pharmacosFromRequest = tempPharmacosFromRequest;
            pharmacosFromRequest.forEach(pharmacosInsideMI => {
                pharmacosFromMedicalInteraction.forEach(PHfromMI => {
                    count = 0;
                    pharmacosInsideMI.forEach(param => {
                        PHfromMI.pharmacos.forEach(pharmaco => {
                            if (param.name == pharmaco.name) {
                                count++
                            }
                        });
                    });
                    if (count == pharmacosInsideMI.length && pharmacosInsideMI.length > 1) {
                        consolide.value = false;
                        consolide.pharmaco = PHfromMI;
                    }
                });
            });
        }
    });

    function awaitFinish() {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!consolide.value) {
                    return res.status(400).send(consolide.pharmaco);
                } else {
                    createMedication(req, res, next)
                }
                resolve(consolide)
            }, 1000)
        })
    }
    nextExecute = await awaitFinish().then(r => r);
};



const verifyPharmacos = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkPharmacosExisted: checkPharmacosExisted,
    checkMedicalInteraction: checkMedicalInteraction
};

module.exports = verifyPharmacos;
