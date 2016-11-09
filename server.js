var express = require('express');
var bodyParser = require('body-parser');

var userController = require('./controllers/user_controller');
var skillsController = require('./controllers/skills_controller');
var secretsController = require('./controllers/secrets_controller');
var middleWare = require('./middleWare.js');

var app = express();
app.use(bodyParser.json());

app.use(userController.addHeaders);

app.get('/name', userController.getName);
app.get('/location', userController.getLocation);
app.get('/occupations', userController.getOcc);
app.get('/occupations/latest', userController.getLatestOcc);
app.get('/hobbies', userController.getHobbies);
app.get('/hobbies/:type', userController.getHobbiesType);
app.get('/family', userController.getFamily);
app.get('/family/:gender', userController.getFamilyGender);
app.get('/restaurants/:rating', userController.getRes);
app.get('/restaurants/:name', userController.getResName);

app.put('/name', userController.updateName);
app.put('/location', userController.updateLocation);

app.post('/hobbies', userController.newHobby);
app.post('/occupations', userController.newOcc);
app.post('/family', userController.newFamily);
app.post('/restaurants', userController.newRes);

// SKILLS
app.get('/skills', skillsController.getSkills);
app.post('/skills', middleWare.generateId, skillsController.newSkill);

// SECRETS
app.get('/secrets', middleWare.verifyUser, secretsController.indexSecrets);

app.listen(3000, function() {
  console.log('listening');
});
