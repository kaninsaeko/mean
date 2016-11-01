'use strict';

/**
 * Module dependencies
 */
var projectsPolicy = require('../policies/projects.server.policy'),
  projects = require('../controllers/projects.server.controller');

var auditprograms = require('C:/Users/gadadmin/mean/modules/auditprograms/server/controllers/auditprograms.server.controller');
//auditprogramsPolicy = require('C:/Users/gadadmin/mean/modules/auditprograms/server/policies/auditprograms.server.policy'),
module.exports = function(app) {
  // Projects Routes
  app.route('/api/projects').all(projectsPolicy.isAllowed)
    .get(projects.list)
    .post(projects.create);


  app.route('/api/projects/:projectId').all(projectsPolicy.isAllowed)
    .get(projects.read)
    .put(projects.update)
    .delete(projects.delete);

  

   /*app.delete('/auditprograms/:auditprogramId', function (req,res) {
    var auditprogramId = req.params.auditprogramId;
    console.log(auditprogramId);
    db.auditprograms.remove({_id: auditprograms.ObjectId(auditprogramId)},function(err,doc){
      res.json(doc);
    })
   })*/
   

   app.route('/api/auditprograms/:auditprogramId')
   .delete();

 



  // Finish by binding the Project middleware
  app.param('projectId', projects.projectByID);
};
