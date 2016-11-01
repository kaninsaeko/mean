'use strict';

/**
 * Module dependencies
 */
var uploadimgsPolicy = require('../policies/uploadimgs.server.policy'),
  uploadimgs = require('../controllers/uploadimgs.server.controller');

module.exports = function(app) {
  // Uploadimgs Routes
  app.route('/api/uploadimgs').all(uploadimgsPolicy.isAllowed)
    .get(uploadimgs.list)
    .post(uploadimgs.create);

  
 
  
  app.route('/api/uploadimgs/create').post(uploadimgs.changeProfilePicture);

  app.route('/api/uploadimgs/:uploadimgId').all(uploadimgsPolicy.isAllowed)
    .get(uploadimgs.read)
    .put(uploadimgs.update)
    .delete(uploadimgs.delete);

  // Finish by binding the Uploadimg middleware
  app.param('uploadimgId', uploadimgs.uploadimgByID);
};
