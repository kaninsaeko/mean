'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Status Schema
 */
var StatusSchema = new Schema({
  auditprogram_id: {
    type: String,
    default: '',
    required: 'Please fill Status id',
    trim: true
  },
  remark: {
    type: String,
    default: '',
    required: 'Please fill Status remark',
    trim: true
  },
  status: {
    type: String,
    default: '',
    required: 'Please fill Status status',
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

mongoose.model('Status', StatusSchema);
