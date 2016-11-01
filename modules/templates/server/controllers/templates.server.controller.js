'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Template = mongoose.model('Template'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Template
 */
exports.create = function(req, res) {
  var template = new Template(req.body);
  template.user = req.user;

  template.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(template);
    }
  });
};

/**
 * Show the current Template
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var template = req.template ? req.template.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  template.isCurrentUserOwner = req.user && template.user && template.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(template);
};

/**
 * Update a Template
 */
exports.update = function(req, res) {
  var template = req.template ;

  template = _.extend(template , req.body);

  template.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(template);
    }
  });
};

/**
 * Delete an Template
 */
exports.delete = function(req, res) {
  var template = req.template ;

  template.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(template);
    }
  });
};

/**
 * List of Templates
 */
exports.list = function(req, res) { 
  Template.find().sort('-created').populate('user', 'displayName').exec(function(err, templates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(templates);
    }
  });
};

/**
 * Template middleware
 */
exports.templateByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Template is invalid'
    });
  }

  Template.findById(id).populate('user', 'displayName').exec(function (err, template) {
    if (err) {
      return next(err);
    } else if (!template) {
      return res.status(404).send({
        message: 'No Template with that identifier has been found'
      });
    }
    req.template = template;
    next();
  });
};
