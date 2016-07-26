'use strict';

const express = require('express');
const server = express();
const router = require('./route/project_routes');

server.use('/', router);

module.exports = server;
