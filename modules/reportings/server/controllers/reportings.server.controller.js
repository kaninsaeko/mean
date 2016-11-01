'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Reporting = mongoose.model('Reporting'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Reporting
 */
exports.create = function(req, res) {
  var reporting = new Reporting(req.body);
  reporting.user = req.user;

  reporting.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reporting);
    }
  });
};

/**
 * Show the current Reporting
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var reporting = req.reporting ? req.reporting.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  reporting.isCurrentUserOwner = req.user && reporting.user && reporting.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(reporting);
};

/**
 * Update a Reporting
 */
exports.update = function(req, res) {
  var reporting = req.reporting ;

  reporting = _.extend(reporting , req.body);

  reporting.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reporting);
    }
  });
};

/**
 * Delete an Reporting
 */
exports.delete = function(req, res) {
  var reporting = req.reporting ;

  reporting.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reporting);
    }
  });
};

/**
 * List of Reportings
 */
exports.list = function(req, res) { 
  Reporting.find().sort('-created').populate('user', 'displayName').exec(function(err, reportings) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reportings);
    }
  });
};

/**
 * Reporting middleware
 */
exports.reportingByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Reporting is invalid'
    });
  }

  Reporting.findById(id).populate('user', 'displayName').exec(function (err, reporting) {
    if (err) {
      return next(err);
    } else if (!reporting) {
      return res.status(404).send({
        message: 'No Reporting with that identifier has been found'
      });
    }
    req.reporting = reporting;
    next();
  });
};
