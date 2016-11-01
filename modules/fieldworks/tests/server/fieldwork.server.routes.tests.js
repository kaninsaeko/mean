'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Fieldwork = mongoose.model('Fieldwork'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, fieldwork;

/**
 * Fieldwork routes tests
 */
describe('Fieldwork CRUD tests', function () {

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

    // Save a user to the test db and create new Fieldwork
    user.save(function () {
      fieldwork = {
        name: 'Fieldwork name'
      };

      done();
    });
  });

  it('should be able to save a Fieldwork if logged in', function (done) {
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

        // Save a new Fieldwork
        agent.post('/api/fieldworks')
          .send(fieldwork)
          .expect(200)
          .end(function (fieldworkSaveErr, fieldworkSaveRes) {
            // Handle Fieldwork save error
            if (fieldworkSaveErr) {
              return done(fieldworkSaveErr);
            }

            // Get a list of Fieldworks
            agent.get('/api/fieldworks')
              .end(function (fieldworksGetErr, fieldworksGetRes) {
                // Handle Fieldwork save error
                if (fieldworksGetErr) {
                  return done(fieldworksGetErr);
                }

                // Get Fieldworks list
                var fieldworks = fieldworksGetRes.body;

                // Set assertions
                (fieldworks[0].user._id).should.equal(userId);
                (fieldworks[0].name).should.match('Fieldwork name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Fieldwork if not logged in', function (done) {
    agent.post('/api/fieldworks')
      .send(fieldwork)
      .expect(403)
      .end(function (fieldworkSaveErr, fieldworkSaveRes) {
        // Call the assertion callback
        done(fieldworkSaveErr);
      });
  });

  it('should not be able to save an Fieldwork if no name is provided', function (done) {
    // Invalidate name field
    fieldwork.name = '';

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

        // Save a new Fieldwork
        agent.post('/api/fieldworks')
          .send(fieldwork)
          .expect(400)
          .end(function (fieldworkSaveErr, fieldworkSaveRes) {
            // Set message assertion
            (fieldworkSaveRes.body.message).should.match('Please fill Fieldwork name');

            // Handle Fieldwork save error
            done(fieldworkSaveErr);
          });
      });
  });

  it('should be able to update an Fieldwork if signed in', function (done) {
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

        // Save a new Fieldwork
        agent.post('/api/fieldworks')
          .send(fieldwork)
          .expect(200)
          .end(function (fieldworkSaveErr, fieldworkSaveRes) {
            // Handle Fieldwork save error
            if (fieldworkSaveErr) {
              return done(fieldworkSaveErr);
            }

            // Update Fieldwork name
            fieldwork.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Fieldwork
            agent.put('/api/fieldworks/' + fieldworkSaveRes.body._id)
              .send(fieldwork)
              .expect(200)
              .end(function (fieldworkUpdateErr, fieldworkUpdateRes) {
                // Handle Fieldwork update error
                if (fieldworkUpdateErr) {
                  return done(fieldworkUpdateErr);
                }

                // Set assertions
                (fieldworkUpdateRes.body._id).should.equal(fieldworkSaveRes.body._id);
                (fieldworkUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Fieldworks if not signed in', function (done) {
    // Create new Fieldwork model instance
    var fieldworkObj = new Fieldwork(fieldwork);

    // Save the fieldwork
    fieldworkObj.save(function () {
      // Request Fieldworks
      request(app).get('/api/fieldworks')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Fieldwork if not signed in', function (done) {
    // Create new Fieldwork model instance
    var fieldworkObj = new Fieldwork(fieldwork);

    // Save the Fieldwork
    fieldworkObj.save(function () {
      request(app).get('/api/fieldworks/' + fieldworkObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', fieldwork.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Fieldwork with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/fieldworks/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Fieldwork is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Fieldwork which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Fieldwork
    request(app).get('/api/fieldworks/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Fieldwork with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Fieldwork if signed in', function (done) {
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

        // Save a new Fieldwork
        agent.post('/api/fieldworks')
          .send(fieldwork)
          .expect(200)
          .end(function (fieldworkSaveErr, fieldworkSaveRes) {
            // Handle Fieldwork save error
            if (fieldworkSaveErr) {
              return done(fieldworkSaveErr);
            }

            // Delete an existing Fieldwork
            agent.delete('/api/fieldworks/' + fieldworkSaveRes.body._id)
              .send(fieldwork)
              .expect(200)
              .end(function (fieldworkDeleteErr, fieldworkDeleteRes) {
                // Handle fieldwork error error
                if (fieldworkDeleteErr) {
                  return done(fieldworkDeleteErr);
                }

                // Set assertions
                (fieldworkDeleteRes.body._id).should.equal(fieldworkSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Fieldwork if not signed in', function (done) {
    // Set Fieldwork user
    fieldwork.user = user;

    // Create new Fieldwork model instance
    var fieldworkObj = new Fieldwork(fieldwork);

    // Save the Fieldwork
    fieldworkObj.save(function () {
      // Try deleting Fieldwork
      request(app).delete('/api/fieldworks/' + fieldworkObj._id)
        .expect(403)
        .end(function (fieldworkDeleteErr, fieldworkDeleteRes) {
          // Set message assertion
          (fieldworkDeleteRes.body.message).should.match('User is not authorized');

          // Handle Fieldwork error error
          done(fieldworkDeleteErr);
        });

    });
  });

  it('should be able to get a single Fieldwork that has an orphaned user reference', function (done) {
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

          // Save a new Fieldwork
          agent.post('/api/fieldworks')
            .send(fieldwork)
            .expect(200)
            .end(function (fieldworkSaveErr, fieldworkSaveRes) {
              // Handle Fieldwork save error
              if (fieldworkSaveErr) {
                return done(fieldworkSaveErr);
              }

              // Set assertions on new Fieldwork
              (fieldworkSaveRes.body.name).should.equal(fieldwork.name);
              should.exist(fieldworkSaveRes.body.user);
              should.equal(fieldworkSaveRes.body.user._id, orphanId);

              // force the Fieldwork to have an orphaned user reference
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

                    // Get the Fieldwork
                    agent.get('/api/fieldworks/' + fieldworkSaveRes.body._id)
                      .expect(200)
                      .end(function (fieldworkInfoErr, fieldworkInfoRes) {
                        // Handle Fieldwork error
                        if (fieldworkInfoErr) {
                          return done(fieldworkInfoErr);
                        }

                        // Set assertions
                        (fieldworkInfoRes.body._id).should.equal(fieldworkSaveRes.body._id);
                        (fieldworkInfoRes.body.name).should.equal(fieldwork.name);
                        should.equal(fieldworkInfoRes.body.user, undefined);

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
      Fieldwork.remove().exec(done);
    });
  });
});
