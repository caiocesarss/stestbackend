const express = require('express');

module.exports = function(server) {
    const mainApi = express.Router();
    server.use('/api', mainApi);

    const Party = require('../api/party/party');
    mainApi.use('/party', Party);

    const Location = require('../api/location/location');
    mainApi.use('/location', Location);

    const Phone = require('../api/phone/phone');
    mainApi.use('/phone', Phone);

    const City = require('../api/location/city');
    mainApi.use('/city', City);

    const Uf = require('../api/location/uf');
    mainApi.use('/uf', Uf);
}
