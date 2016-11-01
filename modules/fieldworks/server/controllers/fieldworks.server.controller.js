'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Fieldwork = mongoose.model('Fieldwork'),
  config = require(path.resolve('./config/config')),
  multer = require('multer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Fieldwork
 */
exports.create = function(req, res) {
  var fieldwork = new Fieldwork(req.body);
  fieldwork.user = req.user;

  fieldwork.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fieldwork);
    }
  });
};

/**
 * Show the current Fieldwork
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var fieldwork = req.fieldwork ? req.fieldwork.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  fieldwork.isCurrentUserOwner = req.user && fieldwork.user && fieldwork.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(fieldwork);
};

/**
 * Update a Fieldwork
 */
exports.update = function(req, res) {
  var fieldwork = req.fieldwork ;

  fieldwork = _.extend(fieldwork , req.body);

  fieldwork.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fieldwork);
    }
  });
};

/**
 * Delete an Fieldwork
 */
exports.delete = function(req, res) {
  var fieldwork = req.fieldwork ;

  fieldwork.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fieldwork);
    }
  });
};

/**
 * List of Fieldworks
 */
exports.list = function(req, res) { 
  Fieldwork.find().sort('-created').populate('user', 'displayName').exec(function(err, fieldworks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fieldworks);
    }
  });
};

/**
 * Fieldwork middleware
 */
exports.fieldworkByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Fieldwork is invalid'
    });
  }

  Fieldwork.findById(id).populate('user', 'displayName').exec(function (err, fieldwork) {
    if (err) {
      return next(err);
    } else if (!fieldwork) {
      return res.status(404).send({
        message: 'No Fieldwork with that identifier has been found'
      });
    }
    req.fieldwork = fieldwork;
    next();
  });
};


exports.changeProfilePicture = function (req, res) {
  //var uploadimg = req.z;
  //console.log(config.uploads.profileUpload.dest);
  //var message = null;

  //var upload = multer(config.uploads.imgUpload).single('newUploadImg');
  //.array('newUploadImg',5);
  //console.log(upload.files);
  //var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  
  // Filtering to upload only images
  //upload.fileFilter = profileUploadFileFilter;
 
    
    //upload(req, res, function (uploadError) {
        //console.log(req.files);
        //uploadimg.profileImageURL = config.uploads.profileUpload.dest + req.file.filename;
        //var uploadimg = new Uploadimg(req.body);
        //uploadimg.user = req.user;
        //uploadimg.profileImageURL = config.uploads.imgUpload.dest+req.file.filename;
        //uploadimg.profileImageURL = 'AAA';
        //uploadimg.name = 'AAA';
        //uploadimg.save(function(err) {
          //if (err) {
            //return res.status(400).send({
              //message: errorHandler.getErrorMessage(err)
            //});
          //} else {
             // res.jsonp(uploadimg);
            //}
        //});
    
    //});
  
};