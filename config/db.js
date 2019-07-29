const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'mysql',
        user: 'mysql',
        password: 'supersecret',
        database: 'samtest'
    }
});

module.exports = knex