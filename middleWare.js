var skills = require('./models/skills_model');
var secrets = require('./models/secrets_model');
var username = 'jerk';
var pin = '6789';

module.exports = {
  generateId: function(req, res, next) {
    req.body.id = skills.skills.length;
    next();
  },
  verifyUser: function(req, res, next) {
    if (req.query.username === username && req.query.pin === pin) {
      next();
    } else {
      res.status(400).json("Username or pin does not match");
    }
  }
};
