const express = require('express');
const passport = require('passport');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');

module.exports = (app) => {
  app.post('/api/google/login', async (req, res) => {
    console.log('in side google server');
    let auth ;
    try {
      let { name, email } = req.body;
      console.log(name, email)
      let user = await User.findOne({ email });
      // See if user exits
      if (user) {
        let payload = {
          user: {
            id: user._id,
            name,
            email,
          },
        };

        auth = 'signin'

        jwt.sign(
          payload,
          keys.jwtSecret,
          { expiresIn: '40d' },
          (err, token) => {
            if (err) throw err;
            res.json({ token , auth});
          }
        );
        
      } else {
        let newUser = new User({
          name,
          email,
        });
        // Save data to atlas
        await newUser.save();
        // In atlas data will be saved
        let payload = {
          user: {
            id: newUser._id,
            name,
            email,
          },
        };
        auth = 'signup'
        // 25200 means 7 hours one user can be online with the given token
        jwt.sign(
          payload,
          keys.jwtSecret,
          { expiresIn: '40d' },
          (err, token) => {
            if (err) throw err;
            res.json({ token, auth});
          }
        );

        console.log('user from google added');
      }
    } catch (e) {
      console.error('error from google login: ', e.message);
      return res.status(404).json({ errors: [{ msg: 'Error From Google' }] });
    }
  });
};
