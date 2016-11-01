'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Uploadimg Schema
 */
var UploadimgSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Uploadimg name',
    trim: true
  },
  profileImageURL: {
    type: String,
    default: 'modules/uploadimgs/client/img/default.png'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Uploadimg', UploadimgSchema);
