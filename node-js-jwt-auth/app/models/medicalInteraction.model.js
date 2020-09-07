module.exports = (sequelize, Sequelize) => {
    const MedicalInteraction = sequelize.define("medicalInteractions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });
    return MedicalInteraction;
};  