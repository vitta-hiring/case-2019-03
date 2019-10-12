import {storageKey} from '../constants/keys';

class AttendanceService {

    storage;

    constructor() {
        this.storage = JSON.parse(localStorage.getItem(storageKey));
    }

    /**
     * Return the value of the item name given.
     *
     * @param name {string}
     * @returns {*}
     */
    getItem(name) {
        return this.storage[name];
    }

    /**
     * Set the value of the item name given
     * @param name
     * @param value
     */
    setItem(name, value) {
        this.storage[name] = value;
    }

    /**
     * Return the list of prescriptions
     *
     * @returns {*}
     */
    getPrescriptions() {
        return this.getItem('prescriptions');
    }

    /**
     * Return the prescription of the id given
     *
     * @param id {string}
     * @returns {*}
     */
    getPrescription(id) {
        const prescriptions = this.getPrescriptions();

        return prescriptions.filter(function (element) {
            return parseInt(element.id, 10) === parseInt(id, 10);
        });
    }

    /**
     * Add the new prescription given
     *
     * @param prescription
     */
    addPrescription(prescription) {
        const prescriptions = this.getPrescriptions();

        prescriptions.unshift(prescription);

        this.setItem('prescriptions', prescriptions);
        this.updateStorage();
    }

    updateStorage() {
        localStorage.setItem(storageKey, JSON.stringify(this.storage));
    }

}

export default AttendanceService;
