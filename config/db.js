const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'db',
        user: 'mysql',
        password: 'supersecret',
        database: 'samtest'
    }
});

module.exports = knex