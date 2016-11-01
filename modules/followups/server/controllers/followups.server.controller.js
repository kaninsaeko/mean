'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Followup = mongoose.model('Followup'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Followup
 */
exports.create = function(req, res) {
  var followup = new Followup(req.body);
  followup.user = req.user;

  followup.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(followup);
    }
  });
};

/**
 * Show the current Followup
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var followup = req.followup ? req.followup.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  followup.isCurrentUserOwner = req.user && followup.user && followup.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(followup);
};

/**
 * Update a Followup
 */
exports.update = function(req, res) {
  var followup = req.followup ;

  followup = _.extend(followup , req.body);

  followup.save(function(err) {
    if (err) {
       return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(followup);
    }
  });
};

/**
 * Delete an Followup
 */
exports.delete = function(req, res) {
  var followup = req.followup ;

  followup.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(followup);
    }
  });
};

/**
 * List of Followups
 */
exports.list = function(req, res) { 
  Followup.find().sort('-created').populate('user', 'displayName').exec(function(err, followups) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(followups);
    }
  });
};

/**
 * Followup middleware
 */
exports.followupByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Followup is invalid'
    });
  }

  Followup.findById(id).populate('user', 'displayName').exec(function (err, followup) {
    if (err) {
      return next(err);
    } else if (!followup) {
      return res.status(404).send({
        message: 'No Followup with that identifier has been found'
      });
    }
    req.followup = followup;
    next();
  });
};
