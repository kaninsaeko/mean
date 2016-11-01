'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Auditprogram = mongoose.model('Auditprogram'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, auditprogram;

/**
 * Auditprogram routes tests
 */
describe('Auditprogram CRUD tests', function () {

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

    // Save a user to the test db and create new Auditprogram
    user.save(function () {
      auditprogram = {
        name: 'Auditprogram name'
      };

      done();
    });
  });

  it('should be able to save a Auditprogram if logged in', function (done) {
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

        // Save a new Auditprogram
        agent.post('/api/auditprograms')
          .send(auditprogram)
          .expect(200)
          .end(function (auditprogramSaveErr, auditprogramSaveRes) {
            // Handle Auditprogram save error
            if (auditprogramSaveErr) {
              return done(auditprogramSaveErr);
            }

            // Get a list of Auditprograms
            agent.get('/api/auditprograms')
              .end(function (auditprogramsGetErr, auditprogramsGetRes) {
                // Handle Auditprogram save error
                if (auditprogramsGetErr) {
                  return done(auditprogramsGetErr);
                }

                // Get Auditprograms list
                var auditprograms = auditprogramsGetRes.body;

                // Set assertions
                (auditprograms[0].user._id).should.equal(userId);
                (auditprograms[0].name).should.match('Auditprogram name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Auditprogram if not logged in', function (done) {
    agent.post('/api/auditprograms')
      .send(auditprogram)
      .expect(403)
      .end(function (auditprogramSaveErr, auditprogramSaveRes) {
        // Call the assertion callback
        done(auditprogramSaveErr);
      });
  });

  it('should not be able to save an Auditprogram if no name is provided', function (done) {
    // Invalidate name field
    auditprogram.name = '';

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

        // Save a new Auditprogram
        agent.post('/api/auditprograms')
          .send(auditprogram)
          .expect(400)
          .end(function (auditprogramSaveErr, auditprogramSaveRes) {
            // Set message assertion
            (auditprogramSaveRes.body.message).should.match('Please fill Auditprogram name');

            // Handle Auditprogram save error
            done(auditprogramSaveErr);
          });
      });
  });

  it('should be able to update an Auditprogram if signed in', function (done) {
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

        // Save a new Auditprogram
        agent.post('/api/auditprograms')
          .send(auditprogram)
          .expect(200)
          .end(function (auditprogramSaveErr, auditprogramSaveRes) {
            // Handle Auditprogram save error
            if (auditprogramSaveErr) {
              return done(auditprogramSaveErr);
            }

            // Update Auditprogram name
            auditprogram.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Auditprogram
            agent.put('/api/auditprograms/' + auditprogramSaveRes.body._id)
              .send(auditprogram)
              .expect(200)
              .end(function (auditprogramUpdateErr, auditprogramUpdateRes) {
                // Handle Auditprogram update error
                if (auditprogramUpdateErr) {
                  return done(auditprogramUpdateErr);
                }

                // Set assertions
                (auditprogramUpdateRes.body._id).should.equal(auditprogramSaveRes.body._id);
                (auditprogramUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Auditprograms if not signed in', function (done) {
    // Create new Auditprogram model instance
    var auditprogramObj = new Auditprogram(auditprogram);

    // Save the auditprogram
    auditprogramObj.save(function () {
      // Request Auditprograms
      request(app).get('/api/auditprograms')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Auditprogram if not signed in', function (done) {
    // Create new Auditprogram model instance
    var auditprogramObj = new Auditprogram(auditprogram);

    // Save the Auditprogram
    auditprogramObj.save(function () {
      request(app).get('/api/auditprograms/' + auditprogramObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', auditprogram.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Auditprogram with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/auditprograms/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Auditprogram is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Auditprogram which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Auditprogram
    request(app).get('/api/auditprograms/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Auditprogram with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Auditprogram if signed in', function (done) {
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

        // Save a new Auditprogram
        agent.post('/api/auditprograms')
          .send(auditprogram)
          .expect(200)
          .end(function (auditprogramSaveErr, auditprogramSaveRes) {
            // Handle Auditprogram save error
            if (auditprogramSaveErr) {
              return done(auditprogramSaveErr);
            }

            // Delete an existing Auditprogram
            agent.delete('/api/auditprograms/' + auditprogramSaveRes.body._id)
              .send(auditprogram)
              .expect(200)
              .end(function (auditprogramDeleteErr, auditprogramDeleteRes) {
                // Handle auditprogram error error
                if (auditprogramDeleteErr) {
                  return done(auditprogramDeleteErr);
                }

                // Set assertions
                (auditprogramDeleteRes.body._id).should.equal(auditprogramSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Auditprogram if not signed in', function (done) {
    // Set Auditprogram user
    auditprogram.user = user;

    // Create new Auditprogram model instance
    var auditprogramObj = new Auditprogram(auditprogram);

    // Save the Auditprogram
    auditprogramObj.save(function () {
      // Try deleting Auditprogram
      request(app).delete('/api/auditprograms/' + auditprogramObj._id)
        .expect(403)
        .end(function (auditprogramDeleteErr, auditprogramDeleteRes) {
          // Set message assertion
          (auditprogramDeleteRes.body.message).should.match('User is not authorized');

          // Handle Auditprogram error error
          done(auditprogramDeleteErr);
        });

    });
  });

  it('should be able to get a single Auditprogram that has an orphaned user reference', function (done) {
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

          // Save a new Auditprogram
          agent.post('/api/auditprograms')
            .send(auditprogram)
            .expect(200)
            .end(function (auditprogramSaveErr, auditprogramSaveRes) {
              // Handle Auditprogram save error
              if (auditprogramSaveErr) {
                return done(auditprogramSaveErr);
              }

              // Set assertions on new Auditprogram
              (auditprogramSaveRes.body.name).should.equal(auditprogram.name);
              should.exist(auditprogramSaveRes.body.user);
              should.equal(auditprogramSaveRes.body.user._id, orphanId);

              // force the Auditprogram to have an orphaned user reference
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

                    // Get the Auditprogram
                    agent.get('/api/auditprograms/' + auditprogramSaveRes.body._id)
                      .expect(200)
                      .end(function (auditprogramInfoErr, auditprogramInfoRes) {
                        // Handle Auditprogram error
                        if (auditprogramInfoErr) {
                          return done(auditprogramInfoErr);
                        }

                        // Set assertions
                        (auditprogramInfoRes.body._id).should.equal(auditprogramSaveRes.body._id);
                        (auditprogramInfoRes.body.name).should.equal(auditprogram.name);
                        should.equal(auditprogramInfoRes.body.user, undefined);

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
      Auditprogram.remove().exec(done);
    });
  });
});
