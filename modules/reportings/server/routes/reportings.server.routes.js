'use strict';

/**
 * Module dependencies
 */
var reportingsPolicy = require('../policies/reportings.server.policy'),
  reportings = require('../controllers/reportings.server.controller');

module.exports = function(app) {
  // Reportings Routes
  app.route('/api/reportings').all(reportingsPolicy.isAllowed)
    .get(reportings.list)
    .post(reportings.create);

  app.route('/api/reportings/:reportingId').all(reportingsPolicy.isAllowed)
    .get(reportings.read)
    .put(reportings.update)
    .delete(reportings.delete);

  // Finish by binding the Reporting middleware
  app.param('reportingId', reportings.reportingByID);
};
