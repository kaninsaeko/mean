'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Template Schema
 */
var TemplateSchema = new Schema({
  group: {
    type: String,
    default: '',
    required: 'Please fill group',
    trim: true
  },
  process: {
    type: String,
    default: '',
    required: 'Please fill process',
    trim: true
  },
  subprocess: {
    type: String,
    default: '',
    required: 'Please fill subprocess',
    trim: true
  },
  processowner: {
    type: String,
    default: '',
    //required: 'Please fill processowner',
    trim: true
  },
  detail: {
    type: String,
    default: '',
    //required: 'Please fill detail',
    trim: true
  },
  risklevel: {
    type: String,
    default: '',
    //required: 'Please fill risklevel',
    trim: true
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

mongoose.model('Template', TemplateSchema);
