'use strict';

/**
 * Module dependencies
 */
var setupsPolicy = require('../policies/setups.server.policy'),
  setups = require('../controllers/setups.server.controller');

module.exports = function(app) {
  // Setups Routes
  app.route('/api/setups').all(setupsPolicy.isAllowed)
    .get(setups.list)
    .post(setups.create);

  app.route('/api/setups/:setupId').all(setupsPolicy.isAllowed)
    .get(setups.read)
    .put(setups.update)
    .delete(setups.delete);

  // Finish by binding the Setup middleware
  app.param('setupId', setups.setupByID);
};
