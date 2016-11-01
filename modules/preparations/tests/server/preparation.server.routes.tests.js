'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Preparation = mongoose.model('Preparation'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, preparation;

/**
 * Preparation routes tests
 */
describe('Preparation CRUD tests', function () {

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

    // Save a user to the test db and create new Preparation
    user.save(function () {
      preparation = {
        name: 'Preparation name'
      };

      done();
    });
  });

  it('should be able to save a Preparation if logged in', function (done) {
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

        // Save a new Preparation
        agent.post('/api/preparations')
          .send(preparation)
          .expect(200)
          .end(function (preparationSaveErr, preparationSaveRes) {
            // Handle Preparation save error
            if (preparationSaveErr) {
              return done(preparationSaveErr);
            }

            // Get a list of Preparations
            agent.get('/api/preparations')
              .end(function (preparationsGetErr, preparationsGetRes) {
                // Handle Preparation save error
                if (preparationsGetErr) {
                  return done(preparationsGetErr);
                }

                // Get Preparations list
                var preparations = preparationsGetRes.body;

                // Set assertions
                (preparations[0].user._id).should.equal(userId);
                (preparations[0].name).should.match('Preparation name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Preparation if not logged in', function (done) {
    agent.post('/api/preparations')
      .send(preparation)
      .expect(403)
      .end(function (preparationSaveErr, preparationSaveRes) {
        // Call the assertion callback
        done(preparationSaveErr);
      });
  });

  it('should not be able to save an Preparation if no name is provided', function (done) {
    // Invalidate name field
    preparation.name = '';

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

        // Save a new Preparation
        agent.post('/api/preparations')
          .send(preparation)
          .expect(400)
          .end(function (preparationSaveErr, preparationSaveRes) {
            // Set message assertion
            (preparationSaveRes.body.message).should.match('Please fill Preparation name');

            // Handle Preparation save error
            done(preparationSaveErr);
          });
      });
  });

  it('should be able to update an Preparation if signed in', function (done) {
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

        // Save a new Preparation
        agent.post('/api/preparations')
          .send(preparation)
          .expect(200)
          .end(function (preparationSaveErr, preparationSaveRes) {
            // Handle Preparation save error
            if (preparationSaveErr) {
              return done(preparationSaveErr);
            }

            // Update Preparation name
            preparation.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Preparation
            agent.put('/api/preparations/' + preparationSaveRes.body._id)
              .send(preparation)
              .expect(200)
              .end(function (preparationUpdateErr, preparationUpdateRes) {
                // Handle Preparation update error
                if (preparationUpdateErr) {
                  return done(preparationUpdateErr);
                }

                // Set assertions
                (preparationUpdateRes.body._id).should.equal(preparationSaveRes.body._id);
                (preparationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Preparations if not signed in', function (done) {
    // Create new Preparation model instance
    var preparationObj = new Preparation(preparation);

    // Save the preparation
    preparationObj.save(function () {
      // Request Preparations
      request(app).get('/api/preparations')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Preparation if not signed in', function (done) {
    // Create new Preparation model instance
    var preparationObj = new Preparation(preparation);

    // Save the Preparation
    preparationObj.save(function () {
      request(app).get('/api/preparations/' + preparationObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', preparation.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Preparation with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/preparations/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Preparation is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Preparation which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Preparation
    request(app).get('/api/preparations/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Preparation with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Preparation if signed in', function (done) {
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

        // Save a new Preparation
        agent.post('/api/preparations')
          .send(preparation)
          .expect(200)
          .end(function (preparationSaveErr, preparationSaveRes) {
            // Handle Preparation save error
            if (preparationSaveErr) {
              return done(preparationSaveErr);
            }

            // Delete an existing Preparation
            agent.delete('/api/preparations/' + preparationSaveRes.body._id)
              .send(preparation)
              .expect(200)
              .end(function (preparationDeleteErr, preparationDeleteRes) {
                // Handle preparation error error
                if (preparationDeleteErr) {
                  return done(preparationDeleteErr);
                }

                // Set assertions
                (preparationDeleteRes.body._id).should.equal(preparationSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Preparation if not signed in', function (done) {
    // Set Preparation user
    preparation.user = user;

    // Create new Preparation model instance
    var preparationObj = new Preparation(preparation);

    // Save the Preparation
    preparationObj.save(function () {
      // Try deleting Preparation
      request(app).delete('/api/preparations/' + preparationObj._id)
        .expect(403)
        .end(function (preparationDeleteErr, preparationDeleteRes) {
          // Set message assertion
          (preparationDeleteRes.body.message).should.match('User is not authorized');

          // Handle Preparation error error
          done(preparationDeleteErr);
        });

    });
  });

  it('should be able to get a single Preparation that has an orphaned user reference', function (done) {
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

          // Save a new Preparation
          agent.post('/api/preparations')
            .send(preparation)
            .expect(200)
            .end(function (preparationSaveErr, preparationSaveRes) {
              // Handle Preparation save error
              if (preparationSaveErr) {
                return done(preparationSaveErr);
              }

              // Set assertions on new Preparation
              (preparationSaveRes.body.name).should.equal(preparation.name);
              should.exist(preparationSaveRes.body.user);
              should.equal(preparationSaveRes.body.user._id, orphanId);

              // force the Preparation to have an orphaned user reference
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

                    // Get the Preparation
                    agent.get('/api/preparations/' + preparationSaveRes.body._id)
                      .expect(200)
                      .end(function (preparationInfoErr, preparationInfoRes) {
                        // Handle Preparation error
                        if (preparationInfoErr) {
                          return done(preparationInfoErr);
                        }

                        // Set assertions
                        (preparationInfoRes.body._id).should.equal(preparationSaveRes.body._id);
                        (preparationInfoRes.body.name).should.equal(preparation.name);
                        should.equal(preparationInfoRes.body.user, undefined);

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
      Preparation.remove().exec(done);
    });
  });
});
