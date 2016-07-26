'use strict';

const Router = require('express').Router;
const app = require('../app');
const bodyParser = require('body-parser').json();


let router = new Router();

router.get('/', (req, res) => {
  app.homepageGet(req, res);
});

router.get('/api/projects/all', (req, res) => {
  app.projectsGetAll(req, res);
});

router.get('/api/projects', (req, res) => {
  let responseJson = {};
  responseJson.status = 400;
  responseJson.msg = 'Bad request, please specify project id. For e.g \'/api/projects/11111\'';
  res.status(responseJson.status).json(responseJson);
});

router.get('/api/projects/:id', (req, res) => {
  app.projectsGetById(req, res);
});

router.post('/api/projects', bodyParser, (req, res) => {
  app.projectsPost(req, res);
});

router.delete('/api/projects/:id', (req, res) => {
  app.projectsDelete(req, res);
});

router.put('/api/projects/:id', (req, res) => {
  app.projectsPut(req, res);
});

router.get('*', (req, res) => {
  let responseJson = {};
  responseJson.status = 404;
  responseJson.msg = '404 Not Found';
  res.status(responseJson.status).json(responseJson);
});

module.exports = router;
