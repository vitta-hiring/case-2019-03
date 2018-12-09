'use strict';

let errors = [];

function Validador() {
    errors = [];
}

Validador.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

Validador.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

Validador.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

Validador.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message });
}


Validador.prototype.errors = () => { 
    return errors; 
}

Validador.prototype.clear = () => {
    errors = [];
}

Validador.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = Validador;