'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Preparation = mongoose.model('Preparation'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Preparation
 */
exports.create = function(req, res) {
  var preparation = new Preparation(req.body);
  preparation.user = req.user;

  preparation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(preparation);
    }
  });
};

/**
 * Show the current Preparation
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var preparation = req.preparation ? req.preparation.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  preparation.isCurrentUserOwner = req.user && preparation.user && preparation.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(preparation);
};

/**
 * Update a Preparation
 */
exports.update = function(req, res) {
  var preparation = req.preparation ;

  preparation = _.extend(preparation , req.body);

  preparation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(preparation);
    }
  });
};

/**
 * Delete an Preparation
 */
exports.delete = function(req, res) {
  var preparation = req.preparation ;

  preparation.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(preparation);
    }
  });
};

/**
 * List of Preparations
 */
exports.list = function(req, res) { 
  Preparation.find().sort('-created').populate('user', 'displayName').exec(function(err, preparations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(preparations);
    }
  });
};

/**
 * Preparation middleware
 */
exports.preparationByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Preparation is invalid'
    });
  }

  Preparation.findById(id).populate('user', 'displayName').exec(function (err, preparation) {
    if (err) {
      return next(err);
    } else if (!preparation) {
      return res.status(404).send({
        message: 'No Preparation with that identifier has been found'
      });
    }
    req.preparation = preparation;
    next();
  });
};
