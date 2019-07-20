const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '0.0.0.0',
        user: 'root',
        password: 'mysql123',
        database: 'samaiait'
    }
});

module.exports = knex