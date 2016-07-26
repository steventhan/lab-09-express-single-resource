'use strict';

const jsonParser = require('./lib/json_parser');
const Project = require('./model/project');

let app = {};

app.projectsDatabase = {
  '2c45ede0-523a-11e6-b124-27e69760e669': {
    id: '2c45ede0-523a-11e6-b124-27e69760e669',
    projectName: 'My HNG',
    technology: ['Python (Flask)', 'SQL (MySQL + SQLAlchemy)', 'CSS (Bootstrap + Insignia bootstrap admin theme)', 'JavaScript (jQuery, WebSockets)', 'Nginx', 'Gunicorn', 'AWS EC2 ubuntu instance'],
    github: 'https://github.com/steventhan/my-hng'
  }
};

app.homepageGet = (req, res) => {
  res.status(200).send('For project API, please go to /api/projects');
};

app.projectsGetAll = (req, res) => {
  let projectsArray = [];
  for (let key in app.projectsDatabase) {
    projectsArray.push(app.projectsDatabase[key]);
  }
  res.status(200).json(projectsArray);
};

app.projectsGetById = (req, res) => {
  let projectId = req.params.id;
  let responseJson = {};
  if (projectId !== undefined) {
    if(app.projectsDatabase[projectId] !== undefined) {
      responseJson.status = 200;
      responseJson.msg = 'Success';
      res.status(responseJson.status).json(app.projectsDatabase[projectId]);
    } else {
      responseJson.status = 404;
      responseJson.msg = 'Project id not found';
      res.status(responseJson.status).json(responseJson);
    }
  } else {
    responseJson.status = 400;
    responseJson.msg = 'Bad request, please specify project id. For e.g \'/api/projects/11111\'';
    res.status(responseJson.status).json(responseJson);
  }
};

app.projectsPost = (req, res) => {
  let responseJson = {};
  if (!req.body) {
    responseJson.status = 400;
    responseJson.msg = 'Error, no json found in the post request' ;
    return res.status(responseJson.status).json(responseJson);
  }
  let parsedJson = req.body;
  if (parsedJson.projectName !== undefined &&
      parsedJson.technology !== undefined &&
      parsedJson.github !== undefined) {
    let project = new Project(parsedJson.projectName, parsedJson.technology, parsedJson.github);
    while(app.projectsDatabase[project.id] !== undefined) {
      project.getNewId();
    }
    app.projectsDatabase[project.id] = project;
    responseJson.status = 200;
    responseJson.msg = 'Success';
    return res.status(responseJson.status).json(project);
  }

  responseJson.status = 400;
  responseJson.msg = 'Bad request, check your json';
  return res.status(responseJson.status).json(responseJson);
};

app.projectsDelete = (req, res) => {
  let projectId = req.params.id;
  let responseJson = {};
  if(app.projectsDatabase[projectId] !== undefined) {
    delete app.projectsDatabase[projectId];
    responseJson.status = 204;
    responseJson.msg = 'Success';
  } else {
    responseJson.status = 404;
    responseJson.msg = 'Project id not found';
  }
  res.status(responseJson.status).json(responseJson);
};

app.projectsPut = (req, res) => {
  let projectId = req.params.id;
  let responseJson = {};
  jsonParser(req)
    .then((parsedJson) => {
      if  (app.projectsDatabase[projectId] !== undefined &&
          parsedJson.projectName !== undefined &&
          parsedJson.technology !== undefined &&
          parsedJson.github !== undefined) {
        app.projectsDatabase[projectId].projectName = parsedJson.projectName;
        app.projectsDatabase[projectId].technology = parsedJson.technology;
        app.projectsDatabase[projectId].github = parsedJson.github;
        responseJson.status = 200;
        responseJson.msg = 'Success';
        res.status(responseJson.status).json(parsedJson);
      } else {
        responseJson.status = 404;
        responseJson.msg = 'Project id not found';
        res.status(responseJson.status).json(responseJson);
      }
    }, (err) => {
      responseJson.status = 400;
      responseJson.msg = 'Error, ' + err.message;
      res.status(responseJson.status).json(responseJson);
    });

};

module.exports = app;
