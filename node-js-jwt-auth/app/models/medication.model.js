module.exports = (sequelize, Sequelize) => {
    const Medication = sequelize.define("medications", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        concentration: {
            type: Sequelize.INTEGER
        },
        unit: {
            type: Sequelize.STRING
        },
        medicationType: {
            type: Sequelize.STRING
        },
        pharmaceuticalForm: {
            type: Sequelize.STRING
        },
        viaAdministrative: {
            type: Sequelize.STRING
        },
        atcCode: {
            type: Sequelize.STRING
        },
        internalUse: {
            type: Sequelize.BOOLEAN
        },
        antimicrobial: {
            type: Sequelize.BOOLEAN
        },
        bula: {
            type: Sequelize.STRING
        },
        ordinance344: {
            type: Sequelize.STRING
        },
        specialCenter: {
            type: Sequelize.STRING
        },
        tiss: {
            type: Sequelize.STRING
        },
        mip: {
            type: Sequelize.STRING
        },
        label: {
            type: Sequelize.STRING
        },
        unified: {
            type: Sequelize.STRING
        }
    });
    return Medication;
};  