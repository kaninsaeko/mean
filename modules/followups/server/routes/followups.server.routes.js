'use strict';

/**
 * Module dependencies
 */
var followupsPolicy = require('../policies/followups.server.policy'),
  followups = require('../controllers/followups.server.controller');

module.exports = function(app) {
  // Followups Routes
  app.route('/api/followups').all(followupsPolicy.isAllowed)
    .get(followups.list)
    .post(followups.create);

  app.route('/api/followups/:followupId').all(followupsPolicy.isAllowed)
    .get(followups.read)
    .put(followups.update)
    .delete(followups.delete);

  // Finish by binding the Followup middleware
  app.param('followupId', followups.followupByID);
};
