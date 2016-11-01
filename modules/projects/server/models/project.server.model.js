'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  projectname: {
    type: String,
    default: '',
    required: 'Please fill Project name',
    trim: true
  },

  bubp: {
    type: String,
    default: '',
    required: 'Please fill BU/BP',
    trim: true
  },

   projectmanager: {
    type: String,
    default: '',
    required: 'Please fill Project Manager',
    trim: true
  },

  projectsup: {
    type: String,
    default: '',
    required: 'Please fill Project Supervior',
    trim: true
  },

  projectmember: {
    type: String,
    default: '',
    required: 'Please fill Project Member',
    trim: true
  },

  projectowner: {
    type: String,
    default: '',
    required: 'Please fill Project Owner',
    trim: true
  },

  startdate: {
    type: String,
    default: '',
    required: 'Please fill Start Date',
    trim: true
  },

  finishdate: {
    type: String,
    default: '',
    required: 'Please fill Finish Date',
    trim: true
  },

  projectdetail: {
    type: String,
    default: '',
    required: 'Please fill Project Detail',
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

mongoose.model('Project', ProjectSchema);
