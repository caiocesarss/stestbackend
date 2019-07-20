const PORT = 3003
const HOST = "0.0.0.0";

const bodyParser = require ('body-parser');
const express = require ('express');
const server = express();
const allowCors = require('./cors');

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(allowCors);

server.listen(PORT, HOST)

module.exports = server;