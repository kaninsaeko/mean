'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Auditprogram = mongoose.model('Auditprogram'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Auditprogram
 */
exports.create = function(req, res) {
  var auditprogram = new Auditprogram(req.body);
  auditprogram.user = req.user;

  auditprogram.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(auditprogram);
    }
  });
};

/**
 * Show the current Auditprogram
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var auditprogram = req.auditprogram ? req.auditprogram.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  auditprogram.isCurrentUserOwner = req.user && auditprogram.user && auditprogram.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(auditprogram);
};

/**
 * Update a Auditprogram
 */
exports.update = function(req, res) {
  var auditprogram = req.auditprogram ;

  auditprogram = _.extend(auditprogram , req.body);

  auditprogram.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(auditprogram);
    }
  });
};

/**
 * Delete an Auditprogram
 */
exports.delete = function(req, res) {
  var auditprogram = req.auditprogram ;

  auditprogram.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(auditprogram);
    }
  });
};

/**
 * List of Auditprograms
 */
exports.list = function(req, res) { 
  Auditprogram.find().sort('-created').populate('user', 'displayName').exec(function(err, auditprograms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(auditprograms);
    }
  });
};

/**
 * Auditprogram middleware
 */
exports.auditprogramByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Auditprogram is invalid'
    });
  }

  Auditprogram.findById(id).populate('user', 'displayName').exec(function (err, auditprogram) {
    if (err) {
      return next(err);
    } else if (!auditprogram) {
      return res.status(404).send({
        message: 'No Auditprogram with that identifier has been found'
      });
    }
    req.auditprogram = auditprogram;
    next();
  });
};
