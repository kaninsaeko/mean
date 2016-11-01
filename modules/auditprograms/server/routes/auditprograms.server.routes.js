'use strict';

/**
 * Module dependencies
 */
var auditprogramsPolicy = require('../policies/auditprograms.server.policy'),
  auditprograms = require('../controllers/auditprograms.server.controller');

module.exports = function(app) {
  // Auditprograms Routes
  app.route('/api/auditprograms')
    .get(auditprograms.list)
    .post(auditprograms.create);
    

  app.route('/api/auditprograms/:auditprogramId').all(auditprogramsPolicy.isAllowed)
    .get(auditprograms.read)
    .put(auditprograms.update)
    .delete(auditprograms.delete);



  // Finish by binding the Auditprogram middleware
  app.param('auditprogramId', auditprograms.auditprogramByID);
};
