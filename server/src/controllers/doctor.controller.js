(function () {
    'use strict';

    const mongoose = require('mongoose');
    const Doctor = mongoose.model('Doctor');

    exports.get = ('/', (req, res, next) => {
        Doctor.find({}).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    });

    exports.post = ('/', (req, res, next) => {
        var doctor = new Doctor(req.body);
        doctor.save().then(x => {
            res.status(201).send({
                message: 'Médico salvo com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao cadastrar médico!',
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