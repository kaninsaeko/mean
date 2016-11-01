'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Reporting = mongoose.model('Reporting'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, reporting;

/**
 * Reporting routes tests
 */
describe('Reporting CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Reporting
    user.save(function () {
      reporting = {
        name: 'Reporting name'
      };

      done();
    });
  });

  it('should be able to save a Reporting if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Reporting
        agent.post('/api/reportings')
          .send(reporting)
          .expect(200)
          .end(function (reportingSaveErr, reportingSaveRes) {
            // Handle Reporting save error
            if (reportingSaveErr) {
              return done(reportingSaveErr);
            }

            // Get a list of Reportings
            agent.get('/api/reportings')
              .end(function (reportingsGetErr, reportingsGetRes) {
                // Handle Reporting save error
                if (reportingsGetErr) {
                  return done(reportingsGetErr);
                }

                // Get Reportings list
                var reportings = reportingsGetRes.body;

                // Set assertions
                (reportings[0].user._id).should.equal(userId);
                (reportings[0].name).should.match('Reporting name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Reporting if not logged in', function (done) {
    agent.post('/api/reportings')
      .send(reporting)
      .expect(403)
      .end(function (reportingSaveErr, reportingSaveRes) {
        // Call the assertion callback
        done(reportingSaveErr);
      });
  });

  it('should not be able to save an Reporting if no name is provided', function (done) {
    // Invalidate name field
    reporting.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Reporting
        agent.post('/api/reportings')
          .send(reporting)
          .expect(400)
          .end(function (reportingSaveErr, reportingSaveRes) {
            // Set message assertion
            (reportingSaveRes.body.message).should.match('Please fill Reporting name');

            // Handle Reporting save error
            done(reportingSaveErr);
          });
      });
  });

  it('should be able to update an Reporting if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Reporting
        agent.post('/api/reportings')
          .send(reporting)
          .expect(200)
          .end(function (reportingSaveErr, reportingSaveRes) {
            // Handle Reporting save error
            if (reportingSaveErr) {
              return done(reportingSaveErr);
            }

            // Update Reporting name
            reporting.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Reporting
            agent.put('/api/reportings/' + reportingSaveRes.body._id)
              .send(reporting)
              .expect(200)
              .end(function (reportingUpdateErr, reportingUpdateRes) {
                // Handle Reporting update error
                if (reportingUpdateErr) {
                  return done(reportingUpdateErr);
                }

                // Set assertions
                (reportingUpdateRes.body._id).should.equal(reportingSaveRes.body._id);
                (reportingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Reportings if not signed in', function (done) {
    // Create new Reporting model instance
    var reportingObj = new Reporting(reporting);

    // Save the reporting
    reportingObj.save(function () {
      // Request Reportings
      request(app).get('/api/reportings')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Reporting if not signed in', function (done) {
    // Create new Reporting model instance
    var reportingObj = new Reporting(reporting);

    // Save the Reporting
    reportingObj.save(function () {
      request(app).get('/api/reportings/' + reportingObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', reporting.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Reporting with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/reportings/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Reporting is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Reporting which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Reporting
    request(app).get('/api/reportings/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Reporting with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Reporting if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Reporting
        agent.post('/api/reportings')
          .send(reporting)
          .expect(200)
          .end(function (reportingSaveErr, reportingSaveRes) {
            // Handle Reporting save error
            if (reportingSaveErr) {
              return done(reportingSaveErr);
            }

            // Delete an existing Reporting
            agent.delete('/api/reportings/' + reportingSaveRes.body._id)
              .send(reporting)
              .expect(200)
              .end(function (reportingDeleteErr, reportingDeleteRes) {
                // Handle reporting error error
                if (reportingDeleteErr) {
                  return done(reportingDeleteErr);
                }

                // Set assertions
                (reportingDeleteRes.body._id).should.equal(reportingSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Reporting if not signed in', function (done) {
    // Set Reporting user
    reporting.user = user;

    // Create new Reporting model instance
    var reportingObj = new Reporting(reporting);

    // Save the Reporting
    reportingObj.save(function () {
      // Try deleting Reporting
      request(app).delete('/api/reportings/' + reportingObj._id)
        .expect(403)
        .end(function (reportingDeleteErr, reportingDeleteRes) {
          // Set message assertion
          (reportingDeleteRes.body.message).should.match('User is not authorized');

          // Handle Reporting error error
          done(reportingDeleteErr);
        });

    });
  });

  it('should be able to get a single Reporting that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Reporting
          agent.post('/api/reportings')
            .send(reporting)
            .expect(200)
            .end(function (reportingSaveErr, reportingSaveRes) {
              // Handle Reporting save error
              if (reportingSaveErr) {
                return done(reportingSaveErr);
              }

              // Set assertions on new Reporting
              (reportingSaveRes.body.name).should.equal(reporting.name);
              should.exist(reportingSaveRes.body.user);
              should.equal(reportingSaveRes.body.user._id, orphanId);

              // force the Reporting to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Reporting
                    agent.get('/api/reportings/' + reportingSaveRes.body._id)
                      .expect(200)
                      .end(function (reportingInfoErr, reportingInfoRes) {
                        // Handle Reporting error
                        if (reportingInfoErr) {
                          return done(reportingInfoErr);
                        }

                        // Set assertions
                        (reportingInfoRes.body._id).should.equal(reportingSaveRes.body._id);
                        (reportingInfoRes.body.name).should.equal(reporting.name);
                        should.equal(reportingInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Reporting.remove().exec(done);
    });
  });
});
