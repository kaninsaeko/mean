'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Uploadimg = mongoose.model('Uploadimg'),
  config = require(path.resolve('./config/config')),
  multer = require('multer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Uploadimg
 */
exports.create = function(req, res) {
  var uploadimg = new Uploadimg(req.body);
  uploadimg.user = req.user;

  uploadimg.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(uploadimg);
    }
  });
};

/**
 * Show the current Uploadimg
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var uploadimg = req.uploadimg ? req.uploadimg.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  uploadimg.isCurrentUserOwner = req.user && uploadimg.user && uploadimg.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(uploadimg);
};

/**
 * Update a Uploadimg
 */
exports.update = function(req, res) {
  var uploadimg = req.uploadimg ;

  uploadimg = _.extend(uploadimg , req.body);

  uploadimg.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(uploadimg);
    }
  });
};

/**
 * Delete an Uploadimg
 */
exports.delete = function(req, res) {
  var uploadimg = req.uploadimg ;

  uploadimg.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(uploadimg);
    }
  });
};

/**
 * List of Uploadimgs
 */
exports.list = function(req, res) { 
  Uploadimg.find().sort('-created').populate('user', 'displayName').exec(function(err, uploadimgs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(uploadimgs);
    }
  });
};

/**
 * Uploadimg middleware
 */
exports.uploadimgByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Uploadimg is invalid'
    });
  }

  Uploadimg.findById(id).populate('user', 'displayName').exec(function (err, uploadimg) {
    if (err) {
      return next(err);
    } else if (!uploadimg) {
      return res.status(404).send({
        message: 'No Uploadimg with that identifier has been found'
      });
    }
    req.uploadimg = uploadimg;
    next();
  });
};

exports.changeProfilePicture = function (req, res) {
  var uploadimg = req.uploadimg;
  //console.log(config.uploads.profileUpload.dest);
  //var message = null;

  var upload = multer(config.uploads.imgUpload).single('newUploadImg');
  //.array('newUploadImg',5);
  //console.log(upload.files);
  //var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  
  // Filtering to upload only images
  //upload.fileFilter = profileUploadFileFilter;
 
    
    upload(req, res, function (uploadError) {
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
    
    });
  
};


