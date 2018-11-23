
const config = require('./config');

module.exports = {
    development: {
        client: 'mysql',
        connection: config.connectionString,
        migrations: {
            directory: config.dir_migration
        },
        seeds: {
            directory: config.dir_seeds
        },
    },
    production: {
        client: 'mysql',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory:  config.dir_migration
        },
        seeds: {
            directory:  config.dir_seeds
        },
    }
}
