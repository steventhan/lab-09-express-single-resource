## CRUD api for personal portfolio projects
AppError constructor is not used, neither is `debug` module. I do not recall we were taught about these in class, used `body-parser` as middleware, still need to find out how to catch error when syntactically invalid json is posted.
## Usage:
  * Navigate to folder `lab-steventhan`
  * Run `node server` to start server
  * To READ all projects, in browser, navigate to `localhost:3000/api/projects/all`, there's should be a dummy object with id of `2c45ede0-523a-11e6-b124-27e69760e669`
  * To READ 1 project in browser, navigate to `localhost:3000/api/projects/2c45ede0-523a-11e6-b124-27e69760e669`. This will show only the dummy project
  * To CREATE a new project run `cat sample-project.json | http localhost:3000/api/projects` from the command line, there should be 2 projects at `localhost:3000/api/projects/all`
  * To UPDATE an existing project run `cat sample-project.json | http PUT localhost:3000/api/projects/2c45ede0-523a-11e6-b124-27e69760e669`, this should update the dummy project with new data from `sample-project.json`
  * To DESTROY a project run `http DELETE localhost:3000/api/projects/2c45ede0-523a-11e6-b124-27e69760e669`, this will remove the dummy project

## Test:
  * Install devDependencies
  * Run either `gulp` or `mocha` to test
