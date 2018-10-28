(function () {
    'use strict';

    const mongoose = require('mongoose');
    const Patient = mongoose.model('Patient');

    exports.get = ('/', (req, res, next) => {
        Patient.find({}, 'name').then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    });

    exports.post = ('/', (req, res, next) => {
        var patient = new Patient(req.body);    
        patient.save().then(x => {
            res.status(201).send({
                message: 'Paciente salva com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao cadastrar paciente!',
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