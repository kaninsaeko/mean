'use strict';

/**
 * Module dependencies
 */
var preparationsPolicy = require('../policies/preparations.server.policy'),
  preparations = require('../controllers/preparations.server.controller');

module.exports = function(app) {
  // Preparations Routes
  app.route('/api/preparations').all(preparationsPolicy.isAllowed)
    .get(preparations.list)
    .post(preparations.create);

  app.route('/api/preparations/:preparationId').all(preparationsPolicy.isAllowed)
    .get(preparations.read)
    .put(preparations.update)
    .delete(preparations.delete);

  // Finish by binding the Preparation middleware
  app.param('preparationId', preparations.preparationByID);
};
