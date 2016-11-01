'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Preparation Schema
 */
var PreparationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Preparation name',
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

mongoose.model('Preparation', PreparationSchema);
