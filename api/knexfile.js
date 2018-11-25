
const config = require('./config');

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'prescricaodb',
            port: 3306
        },
        migrations: {
            directory: config.dir_migration
        },
        seeds: {
            directory: config.dir_seeds
        },
    },
    production: {
        client: 'mysql',
        connection: {
            host: process.env.DATABASE_HOST || '127.0.0.1',
            user: 'root',
            password: '123456',
            database: 'dbprescription',
            port: 3306
        },
        migrations: {
            directory:  config.dir_migration
        },
        seeds: {
            directory:  config.dir_seeds
        },
    }
}
