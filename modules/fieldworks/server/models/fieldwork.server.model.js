'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Fieldwork Schema
 */
var FieldworkSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Fieldwork name',
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

mongoose.model('Fieldwork', FieldworkSchema);
