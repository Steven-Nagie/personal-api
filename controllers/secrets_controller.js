var secrets = require('../models/secrets_model');

module.exports = {
  indexSecrets: function(req, res, next) {
    res.json(secrets);
  }
};
