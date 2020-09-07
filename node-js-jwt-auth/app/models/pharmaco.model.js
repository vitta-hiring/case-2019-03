module.exports = (sequelize, Sequelize) => {
    const Pharmaco = sequelize.define("pharmacos", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        }
    });
    return Pharmaco;
};  