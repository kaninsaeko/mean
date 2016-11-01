'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Uploadimg = mongoose.model('Uploadimg'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, uploadimg;

/**
 * Uploadimg routes tests
 */
describe('Uploadimg CRUD tests', function () {

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

    // Save a user to the test db and create new Uploadimg
    user.save(function () {
      uploadimg = {
        name: 'Uploadimg name'
      };

      done();
    });
  });

  it('should be able to save a Uploadimg if logged in', function (done) {
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

        // Save a new Uploadimg
        agent.post('/api/uploadimgs')
          .send(uploadimg)
          .expect(200)
          .end(function (uploadimgSaveErr, uploadimgSaveRes) {
            // Handle Uploadimg save error
            if (uploadimgSaveErr) {
              return done(uploadimgSaveErr);
            }

            // Get a list of Uploadimgs
            agent.get('/api/uploadimgs')
              .end(function (uploadimgsGetErr, uploadimgsGetRes) {
                // Handle Uploadimg save error
                if (uploadimgsGetErr) {
                  return done(uploadimgsGetErr);
                }

                // Get Uploadimgs list
                var uploadimgs = uploadimgsGetRes.body;

                // Set assertions
                (uploadimgs[0].user._id).should.equal(userId);
                (uploadimgs[0].name).should.match('Uploadimg name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Uploadimg if not logged in', function (done) {
    agent.post('/api/uploadimgs')
      .send(uploadimg)
      .expect(403)
      .end(function (uploadimgSaveErr, uploadimgSaveRes) {
        // Call the assertion callback
        done(uploadimgSaveErr);
      });
  });

  it('should not be able to save an Uploadimg if no name is provided', function (done) {
    // Invalidate name field
    uploadimg.name = '';

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

        // Save a new Uploadimg
        agent.post('/api/uploadimgs')
          .send(uploadimg)
          .expect(400)
          .end(function (uploadimgSaveErr, uploadimgSaveRes) {
            // Set message assertion
            (uploadimgSaveRes.body.message).should.match('Please fill Uploadimg name');

            // Handle Uploadimg save error
            done(uploadimgSaveErr);
          });
      });
  });

  it('should be able to update an Uploadimg if signed in', function (done) {
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

        // Save a new Uploadimg
        agent.post('/api/uploadimgs')
          .send(uploadimg)
          .expect(200)
          .end(function (uploadimgSaveErr, uploadimgSaveRes) {
            // Handle Uploadimg save error
            if (uploadimgSaveErr) {
              return done(uploadimgSaveErr);
            }

            // Update Uploadimg name
            uploadimg.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Uploadimg
            agent.put('/api/uploadimgs/' + uploadimgSaveRes.body._id)
              .send(uploadimg)
              .expect(200)
              .end(function (uploadimgUpdateErr, uploadimgUpdateRes) {
                // Handle Uploadimg update error
                if (uploadimgUpdateErr) {
                  return done(uploadimgUpdateErr);
                }

                // Set assertions
                (uploadimgUpdateRes.body._id).should.equal(uploadimgSaveRes.body._id);
                (uploadimgUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Uploadimgs if not signed in', function (done) {
    // Create new Uploadimg model instance
    var uploadimgObj = new Uploadimg(uploadimg);

    // Save the uploadimg
    uploadimgObj.save(function () {
      // Request Uploadimgs
      request(app).get('/api/uploadimgs')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Uploadimg if not signed in', function (done) {
    // Create new Uploadimg model instance
    var uploadimgObj = new Uploadimg(uploadimg);

    // Save the Uploadimg
    uploadimgObj.save(function () {
      request(app).get('/api/uploadimgs/' + uploadimgObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', uploadimg.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Uploadimg with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/uploadimgs/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Uploadimg is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Uploadimg which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Uploadimg
    request(app).get('/api/uploadimgs/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Uploadimg with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Uploadimg if signed in', function (done) {
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

        // Save a new Uploadimg
        agent.post('/api/uploadimgs')
          .send(uploadimg)
          .expect(200)
          .end(function (uploadimgSaveErr, uploadimgSaveRes) {
            // Handle Uploadimg save error
            if (uploadimgSaveErr) {
              return done(uploadimgSaveErr);
            }

            // Delete an existing Uploadimg
            agent.delete('/api/uploadimgs/' + uploadimgSaveRes.body._id)
              .send(uploadimg)
              .expect(200)
              .end(function (uploadimgDeleteErr, uploadimgDeleteRes) {
                // Handle uploadimg error error
                if (uploadimgDeleteErr) {
                  return done(uploadimgDeleteErr);
                }

                // Set assertions
                (uploadimgDeleteRes.body._id).should.equal(uploadimgSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Uploadimg if not signed in', function (done) {
    // Set Uploadimg user
    uploadimg.user = user;

    // Create new Uploadimg model instance
    var uploadimgObj = new Uploadimg(uploadimg);

    // Save the Uploadimg
    uploadimgObj.save(function () {
      // Try deleting Uploadimg
      request(app).delete('/api/uploadimgs/' + uploadimgObj._id)
        .expect(403)
        .end(function (uploadimgDeleteErr, uploadimgDeleteRes) {
          // Set message assertion
          (uploadimgDeleteRes.body.message).should.match('User is not authorized');

          // Handle Uploadimg error error
          done(uploadimgDeleteErr);
        });

    });
  });

  it('should be able to get a single Uploadimg that has an orphaned user reference', function (done) {
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

          // Save a new Uploadimg
          agent.post('/api/uploadimgs')
            .send(uploadimg)
            .expect(200)
            .end(function (uploadimgSaveErr, uploadimgSaveRes) {
              // Handle Uploadimg save error
              if (uploadimgSaveErr) {
                return done(uploadimgSaveErr);
              }

              // Set assertions on new Uploadimg
              (uploadimgSaveRes.body.name).should.equal(uploadimg.name);
              should.exist(uploadimgSaveRes.body.user);
              should.equal(uploadimgSaveRes.body.user._id, orphanId);

              // force the Uploadimg to have an orphaned user reference
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

                    // Get the Uploadimg
                    agent.get('/api/uploadimgs/' + uploadimgSaveRes.body._id)
                      .expect(200)
                      .end(function (uploadimgInfoErr, uploadimgInfoRes) {
                        // Handle Uploadimg error
                        if (uploadimgInfoErr) {
                          return done(uploadimgInfoErr);
                        }

                        // Set assertions
                        (uploadimgInfoRes.body._id).should.equal(uploadimgSaveRes.body._id);
                        (uploadimgInfoRes.body.name).should.equal(uploadimg.name);
                        should.equal(uploadimgInfoRes.body.user, undefined);

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
      Uploadimg.remove().exec(done);
    });
  });
});
