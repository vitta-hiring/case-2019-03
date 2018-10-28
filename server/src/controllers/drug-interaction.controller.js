(function () {
    'use strict';

    const mongoose = require('mongoose');
    const DrugInteraction = mongoose.model('DrugInteraction');

    exports.get = ('/', (req, res, next) => {
        DrugInteraction.find({}).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    });

    exports.post = ('/', (req, res, next) => {
        var drug_interaction = new DrugInteraction(req.body);
        drug_interaction.save().then(x => {
            res.status(201).send({
                message: 'Interação medicamentosa salva com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao cadastrar interação medicamentosa!',
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