'use strict'

const repository = require('../repositories/doctor-repository');

exports.get = async() => {
    return await repository.get();
};
