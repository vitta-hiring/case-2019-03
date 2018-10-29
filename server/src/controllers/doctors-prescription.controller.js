(function () {
    'use strict';

    const mongoose = require('mongoose');
    const DoctorsPrescription = mongoose.model('DoctorsPrescription');

    exports.get = ('/', (req, res, next) => {
        DoctorsPrescription.find({}).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    });

    exports.post = ('/', (req, res, next) => {
        var doctors_prescription = new DoctorsPrescription(req.body);
        doctors_prescription.save().then(x => {
            res.status(201).send({
                message: 'Prescrição médica salva com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao cadastrar prescrição médica!',
                data: error
            });
        });
    });

    exports.put = ('/:id', (req, res, next) => {
        const id = req.params.id;
        res.status(200).send({
            id: id,
            item: req.body
        });
    });

    exports.delete = ('/', (req, res, next) => {
        const id = req.params.id;
        res.status(200).send(req.body);
    });

})();