var users = require('../models/user_model');

module.exports = {
  //GET
  addHeaders: function(req, res, next) {
    res.status(200).set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    });

    next();
  },
  getName: function(req, res, next) {
    res.json({name: users.name});
  },
  getLocation: function(req, res, next) {
    res.json({location: users.location});
  },
  getOcc: function(req, res, next) {
    var queryOrder = req.query.order;
    if (queryOrder) {
      if (queryOrder === 'asc') {
        return res.json(users.occupations.sort());
      } else if (queryOrder === 'desc') {
        return res.json(users.occupations.sort().reverse());
      }
    } else {
      res.json({occupations: users.occupations});
    }
  },
  getLatestOcc: function(req, res, next) {
    res.json({latestOccupation: users.occupations[users.occupations.length -1]});
  },
  getHobbies: function(req, res, next) {
    res.json({hobbies: users.hobbies});
  },
  getHobbiesType: function(req, res, next) {
    var typeHob = req.params.type;
    var specificHobbies = users.hobbies.filter(function(hobby) {
      return hobby.type === typeHob;
    });
    res.json({hobbies: specificHobbies});
  },
  getFamily: function(req, res, next) {
    res.json({family: users.family});
  },
  getFamilyGender: function(req, res, next) {
    var gen = req.params.gender;
    var familyGender = users.family.filter(function(person) {
      return person.gender === gen;
    });
    res.json({family: familyGender});
  },
  getRes: function(req, res, next) {
    var queryRating = req.query.rating;

    if (req.query >= 2) {
      var goodRes = users.restaurants.filter(function(res) {
        return res.rating === req.query;
      });
      return res.json({goodRestaurants: goodRes});
    } else {
    return res.json({restaurants: users.restaurants});
    }
  },
  getResName: function(req, res, next) {
    var name = req.params.name;
    var rests = users.restaurants.filter(function(res) {
      return res.name === name;
    });
    res.json({restaurant: rests});
  },
  //PUT
  updateName: function(req, res, next) {
    users.name = req.body.name;
    res.json({name: users.name});
  },
  updateLocation: function(req, res, next) {
    users.location = req.body.location;
    res.json({location: users.location});
  },
  //POST
  newHobby: function(req, res, next) {
    users.hobbies.push(req.body);
  },
  newOcc: function(req, res, next) {
    users.occupations.push(req.body.newOcc);
  },
  newFamily: function(req, res, next) {
    users.family.push(req.body);
  },
  newRes: function(req, res, next) {
    users.restaurants.push(req.body);
  }

};
