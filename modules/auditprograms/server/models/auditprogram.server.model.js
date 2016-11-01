'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Auditprogram Schema
 */
var AuditprogramSchema = new Schema({
  projectname: {
    type: String,
    required: 'Please fill process',
    default: '',
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
    required: 'Please fill processowner',
    trim: true
  },
  detail: {
    type: String,
    default: '',
    required: 'Please fill detail',
    trim: true
  },
  risklevel: {
    type: String,
    default: '',
    required: 'Please fill risklevel',
    trim: true
  },
   finding: {
    type: String,
    default: '',
    //required: 'Please fill finding',
    trim: true
  },
   observation: {
    type: String,
    default: '',
    //required: 'Please fill observation',
    trim: true
  },
   respond: {
    type: String,
    default: '',
    //required: 'Please fill respond',
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

mongoose.model('Auditprogram', AuditprogramSchema);
