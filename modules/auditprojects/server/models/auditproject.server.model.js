'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Auditproject Schema
 */
var AuditprojectSchema = new Schema({
  projectname: {
    type: String,
    default: '',
    required: 'Please fill Auditproject projectname',
    trim: true
  },
  projectowner: {
    type: String,
    default: '',
    required: 'Please fill Auditproject projectowner',
    trim: true
  },
  startdate: {
    type: String,
    default: '',
    required: 'Please fill Auditproject startdate',
    trim: true
  },
  finishdate: {
    type: String,
    default: '',
    required: 'Please fill Auditproject finishdate',
    trim: true
  },
  finding: {
    type: String,
    default: '',
    required: 'Please fill Auditproject finishdate',
    trim: true
  },
  observation: {
    type: String,
    default: '',
    required: 'Please fill Auditproject finishdate',
    trim: true
  },
  respond: {
    type: String,
    default: '',
    required: 'Please fill Auditproject finishdate',
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

mongoose.model('Auditproject', AuditprojectSchema);
