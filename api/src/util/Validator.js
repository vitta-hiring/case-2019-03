'use strict';

let errors = [];

function Validador() {
    errors = [];
}

Validador.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

Validador.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = Validador;