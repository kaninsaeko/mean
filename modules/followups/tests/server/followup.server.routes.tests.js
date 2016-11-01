'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Followup = mongoose.model('Followup'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, followup;

/**
 * Followup routes tests
 */
describe('Followup CRUD tests', function () {

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

    // Save a user to the test db and create new Followup
    user.save(function () {
      followup = {
        name: 'Followup name'
      };

      done();
    });
  });

  it('should be able to save a Followup if logged in', function (done) {
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

        // Save a new Followup
        agent.post('/api/followups')
          .send(followup)
          .expect(200)
          .end(function (followupSaveErr, followupSaveRes) {
            // Handle Followup save error
            if (followupSaveErr) {
              return done(followupSaveErr);
            }

            // Get a list of Followups
            agent.get('/api/followups')
              .end(function (followupsGetErr, followupsGetRes) {
                // Handle Followup save error
                if (followupsGetErr) {
                  return done(followupsGetErr);
                }

                // Get Followups list
                var followups = followupsGetRes.body;

                // Set assertions
                (followups[0].user._id).should.equal(userId);
                (followups[0].name).should.match('Followup name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Followup if not logged in', function (done) {
    agent.post('/api/followups')
      .send(followup)
      .expect(403)
      .end(function (followupSaveErr, followupSaveRes) {
        // Call the assertion callback
        done(followupSaveErr);
      });
  });

  it('should not be able to save an Followup if no name is provided', function (done) {
    // Invalidate name field
    followup.name = '';

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

        // Save a new Followup
        agent.post('/api/followups')
          .send(followup)
          .expect(400)
          .end(function (followupSaveErr, followupSaveRes) {
            // Set message assertion
            (followupSaveRes.body.message).should.match('Please fill Followup name');

            // Handle Followup save error
            done(followupSaveErr);
          });
      });
  });

  it('should be able to update an Followup if signed in', function (done) {
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

        // Save a new Followup
        agent.post('/api/followups')
          .send(followup)
          .expect(200)
          .end(function (followupSaveErr, followupSaveRes) {
            // Handle Followup save error
            if (followupSaveErr) {
              return done(followupSaveErr);
            }

            // Update Followup name
            followup.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Followup
            agent.put('/api/followups/' + followupSaveRes.body._id)
              .send(followup)
              .expect(200)
              .end(function (followupUpdateErr, followupUpdateRes) {
                // Handle Followup update error
                if (followupUpdateErr) {
                  return done(followupUpdateErr);
                }

                // Set assertions
                (followupUpdateRes.body._id).should.equal(followupSaveRes.body._id);
                (followupUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Followups if not signed in', function (done) {
    // Create new Followup model instance
    var followupObj = new Followup(followup);

    // Save the followup
    followupObj.save(function () {
      // Request Followups
      request(app).get('/api/followups')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Followup if not signed in', function (done) {
    // Create new Followup model instance
    var followupObj = new Followup(followup);

    // Save the Followup
    followupObj.save(function () {
      request(app).get('/api/followups/' + followupObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', followup.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Followup with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/followups/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Followup is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Followup which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Followup
    request(app).get('/api/followups/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Followup with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Followup if signed in', function (done) {
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

        // Save a new Followup
        agent.post('/api/followups')
          .send(followup)
          .expect(200)
          .end(function (followupSaveErr, followupSaveRes) {
            // Handle Followup save error
            if (followupSaveErr) {
              return done(followupSaveErr);
            }

            // Delete an existing Followup
            agent.delete('/api/followups/' + followupSaveRes.body._id)
              .send(followup)
              .expect(200)
              .end(function (followupDeleteErr, followupDeleteRes) {
                // Handle followup error error
                if (followupDeleteErr) {
                  return done(followupDeleteErr);
                }

                // Set assertions
                (followupDeleteRes.body._id).should.equal(followupSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Followup if not signed in', function (done) {
    // Set Followup user
    followup.user = user;

    // Create new Followup model instance
    var followupObj = new Followup(followup);

    // Save the Followup
    followupObj.save(function () {
      // Try deleting Followup
      request(app).delete('/api/followups/' + followupObj._id)
        .expect(403)
        .end(function (followupDeleteErr, followupDeleteRes) {
          // Set message assertion
          (followupDeleteRes.body.message).should.match('User is not authorized');

          // Handle Followup error error
          done(followupDeleteErr);
        });

    });
  });

  it('should be able to get a single Followup that has an orphaned user reference', function (done) {
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

          // Save a new Followup
          agent.post('/api/followups')
            .send(followup)
            .expect(200)
            .end(function (followupSaveErr, followupSaveRes) {
              // Handle Followup save error
              if (followupSaveErr) {
                return done(followupSaveErr);
              }

              // Set assertions on new Followup
              (followupSaveRes.body.name).should.equal(followup.name);
              should.exist(followupSaveRes.body.user);
              should.equal(followupSaveRes.body.user._id, orphanId);

              // force the Followup to have an orphaned user reference
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

                    // Get the Followup
                    agent.get('/api/followups/' + followupSaveRes.body._id)
                      .expect(200)
                      .end(function (followupInfoErr, followupInfoRes) {
                        // Handle Followup error
                        if (followupInfoErr) {
                          return done(followupInfoErr);
                        }

                        // Set assertions
                        (followupInfoRes.body._id).should.equal(followupSaveRes.body._id);
                        (followupInfoRes.body.name).should.equal(followup.name);
                        should.equal(followupInfoRes.body.user, undefined);

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
      Followup.remove().exec(done);
    });
  });
});
