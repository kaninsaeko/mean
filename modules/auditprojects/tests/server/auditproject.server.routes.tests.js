'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Auditproject = mongoose.model('Auditproject'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, auditproject;

/**
 * Auditproject routes tests
 */
describe('Auditproject CRUD tests', function () {

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

    // Save a user to the test db and create new Auditproject
    user.save(function () {
      auditproject = {
        name: 'Auditproject name'
      };

      done();
    });
  });

  it('should be able to save a Auditproject if logged in', function (done) {
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

        // Save a new Auditproject
        agent.post('/api/auditprojects')
          .send(auditproject)
          .expect(200)
          .end(function (auditprojectSaveErr, auditprojectSaveRes) {
            // Handle Auditproject save error
            if (auditprojectSaveErr) {
              return done(auditprojectSaveErr);
            }

            // Get a list of Auditprojects
            agent.get('/api/auditprojects')
              .end(function (auditprojectsGetErr, auditprojectsGetRes) {
                // Handle Auditproject save error
                if (auditprojectsGetErr) {
                  return done(auditprojectsGetErr);
                }

                // Get Auditprojects list
                var auditprojects = auditprojectsGetRes.body;

                // Set assertions
                (auditprojects[0].user._id).should.equal(userId);
                (auditprojects[0].name).should.match('Auditproject name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Auditproject if not logged in', function (done) {
    agent.post('/api/auditprojects')
      .send(auditproject)
      .expect(403)
      .end(function (auditprojectSaveErr, auditprojectSaveRes) {
        // Call the assertion callback
        done(auditprojectSaveErr);
      });
  });

  it('should not be able to save an Auditproject if no name is provided', function (done) {
    // Invalidate name field
    auditproject.name = '';

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

        // Save a new Auditproject
        agent.post('/api/auditprojects')
          .send(auditproject)
          .expect(400)
          .end(function (auditprojectSaveErr, auditprojectSaveRes) {
            // Set message assertion
            (auditprojectSaveRes.body.message).should.match('Please fill Auditproject name');

            // Handle Auditproject save error
            done(auditprojectSaveErr);
          });
      });
  });

  it('should be able to update an Auditproject if signed in', function (done) {
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

        // Save a new Auditproject
        agent.post('/api/auditprojects')
          .send(auditproject)
          .expect(200)
          .end(function (auditprojectSaveErr, auditprojectSaveRes) {
            // Handle Auditproject save error
            if (auditprojectSaveErr) {
              return done(auditprojectSaveErr);
            }

            // Update Auditproject name
            auditproject.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Auditproject
            agent.put('/api/auditprojects/' + auditprojectSaveRes.body._id)
              .send(auditproject)
              .expect(200)
              .end(function (auditprojectUpdateErr, auditprojectUpdateRes) {
                // Handle Auditproject update error
                if (auditprojectUpdateErr) {
                  return done(auditprojectUpdateErr);
                }

                // Set assertions
                (auditprojectUpdateRes.body._id).should.equal(auditprojectSaveRes.body._id);
                (auditprojectUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Auditprojects if not signed in', function (done) {
    // Create new Auditproject model instance
    var auditprojectObj = new Auditproject(auditproject);

    // Save the auditproject
    auditprojectObj.save(function () {
      // Request Auditprojects
      request(app).get('/api/auditprojects')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Auditproject if not signed in', function (done) {
    // Create new Auditproject model instance
    var auditprojectObj = new Auditproject(auditproject);

    // Save the Auditproject
    auditprojectObj.save(function () {
      request(app).get('/api/auditprojects/' + auditprojectObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', auditproject.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Auditproject with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/auditprojects/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Auditproject is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Auditproject which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Auditproject
    request(app).get('/api/auditprojects/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Auditproject with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Auditproject if signed in', function (done) {
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

        // Save a new Auditproject
        agent.post('/api/auditprojects')
          .send(auditproject)
          .expect(200)
          .end(function (auditprojectSaveErr, auditprojectSaveRes) {
            // Handle Auditproject save error
            if (auditprojectSaveErr) {
              return done(auditprojectSaveErr);
            }

            // Delete an existing Auditproject
            agent.delete('/api/auditprojects/' + auditprojectSaveRes.body._id)
              .send(auditproject)
              .expect(200)
              .end(function (auditprojectDeleteErr, auditprojectDeleteRes) {
                // Handle auditproject error error
                if (auditprojectDeleteErr) {
                  return done(auditprojectDeleteErr);
                }

                // Set assertions
                (auditprojectDeleteRes.body._id).should.equal(auditprojectSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Auditproject if not signed in', function (done) {
    // Set Auditproject user
    auditproject.user = user;

    // Create new Auditproject model instance
    var auditprojectObj = new Auditproject(auditproject);

    // Save the Auditproject
    auditprojectObj.save(function () {
      // Try deleting Auditproject
      request(app).delete('/api/auditprojects/' + auditprojectObj._id)
        .expect(403)
        .end(function (auditprojectDeleteErr, auditprojectDeleteRes) {
          // Set message assertion
          (auditprojectDeleteRes.body.message).should.match('User is not authorized');

          // Handle Auditproject error error
          done(auditprojectDeleteErr);
        });

    });
  });

  it('should be able to get a single Auditproject that has an orphaned user reference', function (done) {
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

          // Save a new Auditproject
          agent.post('/api/auditprojects')
            .send(auditproject)
            .expect(200)
            .end(function (auditprojectSaveErr, auditprojectSaveRes) {
              // Handle Auditproject save error
              if (auditprojectSaveErr) {
                return done(auditprojectSaveErr);
              }

              // Set assertions on new Auditproject
              (auditprojectSaveRes.body.name).should.equal(auditproject.name);
              should.exist(auditprojectSaveRes.body.user);
              should.equal(auditprojectSaveRes.body.user._id, orphanId);

              // force the Auditproject to have an orphaned user reference
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

                    // Get the Auditproject
                    agent.get('/api/auditprojects/' + auditprojectSaveRes.body._id)
                      .expect(200)
                      .end(function (auditprojectInfoErr, auditprojectInfoRes) {
                        // Handle Auditproject error
                        if (auditprojectInfoErr) {
                          return done(auditprojectInfoErr);
                        }

                        // Set assertions
                        (auditprojectInfoRes.body._id).should.equal(auditprojectSaveRes.body._id);
                        (auditprojectInfoRes.body.name).should.equal(auditproject.name);
                        should.equal(auditprojectInfoRes.body.user, undefined);

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
      Auditproject.remove().exec(done);
    });
  });
});
