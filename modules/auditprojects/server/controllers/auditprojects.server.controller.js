'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Auditproject = mongoose.model('Auditproject'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Auditproject
 */
exports.create = function(req, res) {
  var auditproject = new Auditproject(req.body);
  auditproject.user = req.user;

  auditproject.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(auditproject);
    }
  });
};

/**
 * Show the current Auditproject
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var auditproject = req.auditproject ? req.auditproject.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  auditproject.isCurrentUserOwner = req.user && auditproject.user && auditproject.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(auditproject);
};

/**
 * Update a Auditproject
 */
exports.update = function(req, res) {
  var auditproject = req.auditproject ;

  auditproject = _.extend(auditproject , req.body);

  auditproject.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(auditproject);
    }
  });
};

/**
 * Delete an Auditproject
 */
exports.delete = function(req, res) {
  var auditproject = req.auditproject ;

  auditproject.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(auditproject);
    }
  });
};

/**
 * List of Auditprojects
 */
exports.list = function(req, res) { 
  Auditproject.find().sort('-created').populate('user', 'displayName').exec(function(err, auditprojects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(auditprojects);
    }
  });
};

/**
 * Auditproject middleware
 */
exports.auditprojectByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Auditproject is invalid'
    });
  }

  Auditproject.findById(id).populate('user', 'displayName').exec(function (err, auditproject) {
    if (err) {
      return next(err);
    } else if (!auditproject) {
      return res.status(404).send({
        message: 'No Auditproject with that identifier has been found'
      });
    }
    req.auditproject = auditproject;
    next();
  });
};
