'use strict'

const repository = require('../repositories/patients-repository');

exports.get = async() => {
    return await repository.get();
};
