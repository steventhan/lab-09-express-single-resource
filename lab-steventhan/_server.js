'use strict';

const http = require('http');
const Router = require('thanst-router');
const app = require('./app');

let router = new Router('/'); // Passing in base url

router.get('/', (req, res) => {
  app.homepageGet(req, res);
});

router.get('/api/projects/all', (req, res) => {
  app.projectsGetAll(req, res);
});

router.get('/api/projects', (req, res) => {
  app.projectsGetById(req, res);
});

router.post('/api/projects', (req, res) => {
  app.projectsPost(req, res);
});

router.delete('/api/projects', (req, res) => {
  app.projectsDelete(req, res);
});

router.put('/api/projects', (req, res) => {
  app.projectsPut(req, res);
});

let server = http.createServer(router.init());

module.exports = server;
