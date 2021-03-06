/**!
 *
 * Copyright (c) 2015-2016 Cisco Systems, Inc. See LICENSE file.
 * @private
 */

'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var createUser = require('./create-user');

/* eslint new-cap: [0] */
var router = module.exports = express.Router();

// Enable JSON bodies
// ------------------

router.use(bodyParser.json({
  strict: false
}));

router.post('/', function convertUserNameToJWT(req, res, next) {
  if (!req.body.subject) {
    res
       .status(400)
       .json({
         error: '`subject` is a required body parameter'
       })
       .end();
    return;
  }

  createUser(req.body)
    .then(function onSucces(token) {
      res.status(201).json({jwt: token}).end();
    })
    .catch(next);
});
