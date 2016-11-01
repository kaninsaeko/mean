'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Followup Schema
 */
var FollowupSchema = new Schema({
  bu: {
    type: String,
    default: '',
    required: 'Please fill Followup Business Unit',
    trim: true
  },
  dep: {
    type: String,
    default: '',
    required: 'Please fill Followup Department',
    trim: true
  },
  title: {
    type: String,
    default: '',
    required: 'Please fill Followup Title',
    trim: true
  },
  finding: {
    type: String,
    default: '',
    required: 'Please fill Followup Finding',
    trim: true
  },
  risk: {
    type: String,
    default: '',
    required: 'Please fill Followup Risk Impact',
    trim: true
  },
  recom: {
    type: String,
    default: '',
    required: 'Please fill Followup Recomendation',
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

mongoose.model('Followup', FollowupSchema);

