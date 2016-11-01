'use strict';

/**
 * Module dependencies
 */
var auditprojectsPolicy = require('../policies/auditprojects.server.policy'),
  auditprojects = require('../controllers/auditprojects.server.controller');

module.exports = function(app) {
  // Auditprojects Routes
  app.route('/api/auditprojects').all(auditprojectsPolicy.isAllowed)
    .get(auditprojects.list)
    .post(auditprojects.create);

  app.route('/api/auditprojects/:auditprojectId').all(auditprojectsPolicy.isAllowed)
    .get(auditprojects.read)
    .put(auditprojects.update)
    .delete(auditprojects.delete);

  // Finish by binding the Auditproject middleware
  app.param('auditprojectId', auditprojects.auditprojectByID);
};
