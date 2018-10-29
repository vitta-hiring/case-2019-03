(function () {
    'use strict';

    const mongoose = require('mongoose');
    const Medication = mongoose.model('Medication');

    exports.get = ('/', (req, res, next) => {
        Medication.find({}).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    });

    exports.post = ('/', (req, res, next) => {
        var medication = new Medication(req.body);
        medication.save().then(x => {
            res.status(201).send({
                message: 'Medicação salva com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao cadastrar medicação!',
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