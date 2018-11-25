'use strict'

var knex = require('../database/knex');

const table_prescription = 'prescription';
const table_doctors = 'doctors';
const table_patients = 'patients';
const table_prescriptions_medications = 'prescriptions_medications';
const table_medication = 'medications';

exports.get = async() => {
    return await 
    knex
    .select(
        `${table_prescription}.*`, 
        `${table_doctors}.name as doctor_name`,
        `${table_patients}.name as patient_name`)
    .from(table_prescription)
    .innerJoin(table_doctors, `${table_prescription}.doctor_id`, `${table_doctors}.id` )
    .innerJoin(table_patients, `${table_prescription}.patient_id`, `${table_patients}.id`);
};

exports.getPrescriptionsByPatientId = async(patientId) => {
    return await 
    knex
    .select(
        `${table_prescription}.*`, 
        `${table_doctors}.name as doctor_name`,
        `${table_patients}.name as patient_name`)
    .from(table_prescription)
    .innerJoin(table_doctors, `${table_prescription}.doctor_id`, `${table_doctors}.id` )
    .innerJoin(table_patients, `${table_prescription}.patient_id`, `${table_patients}.id`)
    .where("patient_id", patientId);
};

exports.getMedicationPrescription = async(prescription_id) => {
    return await 
    knex
    .select()
    .from(table_prescriptions_medications)
    .innerJoin(table_medication, `${table_prescriptions_medications}.medication_id`, `${table_medication}.id`)
    .where(`${table_prescriptions_medications}.prescription_id`, prescription_id);
};

exports.createPrescription = async(data) => {
    return await knex(table_prescription).returning('id').insert(data);
}

exports.createPrescriptionMedications = async(data) => {
    return await knex(table_prescriptions_medications).insert(data);
}
