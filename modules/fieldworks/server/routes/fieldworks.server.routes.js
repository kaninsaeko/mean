'use strict';

/**
 * Module dependencies
 */
var fieldworksPolicy = require('../policies/fieldworks.server.policy'),
  fieldworks = require('../controllers/fieldworks.server.controller');

var auditprograms = require('C:/Users/gadadmin/mean/modules/auditprograms/server/controllers/auditprograms.server.controller');

module.exports = function(app) {
  // Fieldworks Routes
  app.route('/api/fieldworks').all(fieldworksPolicy.isAllowed)
    .get(fieldworks.list)
    .post(fieldworks.create);
    
  app.route('/api/fieldworks/up').post(fieldworks.changeProfilePicture);

  app.route('/api/fieldworks/:fieldworkId').all(fieldworksPolicy.isAllowed)
    .get(fieldworks.read)
    .put(fieldworks.update)
    .delete(fieldworks.delete);

  app.route('/api/auditprograms/:auditprogramId')
    .put(auditprograms.update);

  // Finish by binding the Fieldwork middleware
  //app.param('fieldworkId', fieldworks.fieldworkByID);
};
