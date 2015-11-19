// Require modules
var express = require('express');
var router = express.Router();
var User = require('../../model_handlers/user');
var crypto = require('crypto');

//Handles requests sent to /users/
router.route('/')
  //Returns all users
  .get(function(req, res) {
    console.log('Getting all users');
    User.all(function(result) {
      res.json(result);
    });
  })
  //Adds new user
  .post(function(req, res) {
    User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }, function(email) {
      req.session.user = email;
    });
    res.redirect('/home');
  });

//Handles requests sent to /users/:userId
router.route('/id/:email')
  //Returns user with userId
  .get(function(req, res) {
    User.getByEmail(req.params.email, function(result) {
      res.json(result);
    });
  })
  //Updates user with userId
  .post(function(req, res) {
    // User.update(req.params.userId, {
    //   username: req.body.username,
    //   email: req.body.email,
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   password: req.body.password
    // });
  });

router.route('/auth')
  .post(function(req, res) {
    User.authenticate(req.body.email, req.body.password, function(valid) {
      if (valid) {
        req.session.user = req.body.email;
        res.redirect('/home');
      } else {
        res.redirect('/login');
      }
    });
  });

router.route('/picHash')
  .get(function(req, res) {
    if (req.session.user) {
      User.getByEmail(req.session.user, function(result) {
        res.json(result.email_hash);
      });
    } else {
      res.json("");
    }
  });

// Publish methods
module.exports = router;
