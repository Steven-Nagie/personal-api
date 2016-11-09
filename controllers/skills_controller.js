var skills = require('../models/skills_model');

module.exports = {
  getSkills: function(req, res, next) {
    var queryExp = req.query.experience;
    if (queryExp) {
      var expSkills = skills.skills.filter(function(skill) {
        return skill.experience === queryExp;
      });
      return res.json(expSkills);
    } else {
    res.json(skills.skills);
    }
  },
  newSkill: function(req, res, next) {
    skills.skills.push(req.body);
  }
};
