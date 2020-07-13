const express = require('express');
const { check, validationResult } = require('express-validator');
const Event = require('../models/Event');
const Profile = require('../models/Profile');
const verify = require('../verifytokenmw/verify_mv');

module.exports = (app) => {
  app.get('/api/event/allevents', verify, async (req, res) => {
    try {
      const events = await Event.find().sort({ date: -1 });
      res.json(events);
    } catch (err) {
      console.error('fetchError: ', err.message);
      res.status(500).send('Server Error');
    }
  });

  app.get('/api/event/searchedevents/:eventname', async (req, res) => {
    try {
      const events = await Event.find({
        game: { $regex: '^' + req.params.eventname, $options: 'i' },
      });
      // .sort({ participants: -1 })
      // .limit(10);
      // This {{participants: -1}} means that event with the highest participants will be shown first
      res.json(events);
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  app.post(
    '/api/event/addevent',
    [
      verify,
      [
        check('game', 'You have to tell your game name to players')
          .not()
          .isEmpty(),
        check('description', 'Hey please tell ur players about this event')
          .not()
          .isEmpty(),
      ],
      // check('image', 'Image or poster of your event is required').not().isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      let {
        description,
        game,
        contact,
        entryFee,
        title,
        teamsize,
        poolprize,
        time,
      } = req.body;
      // build eventitems object
      let eventitems = {};
      eventitems.user = req.user.id;
      if (game) eventitems.game = game;
      if (description) eventitems.description = description;
      if (title) eventitems.title = title;
      if (entryFee) eventitems.entryFee = entryFee;
      if (contact) eventitems.contact = contact;
      if (teamsize) eventitems.teamsize = teamsize;
      if (poolprize) eventitems.poolprize = poolprize;
      if (time) eventitems.time = time;

      try {
        let event = new Event(eventitems);

        let eventsuccess = await event.save();

        console.log(eventsuccess);

        if (!eventsuccess) {
          return res.json({
            errors: [{ msg: 'Sorry ur event was not posted' }],
          });
        }

        let profile = await Profile.findOne({ user: req.user.id });

        console.log(profile);

        profile.myevents.push(event);

        await profile.save();

        if (!profile) {
          return res.json({
            errors: [{ msg: 'Sorry ur event was not saved in your profile' }],
          });
        }

        res.json(profile.myevents);
      } catch (err) {
        res.status(500).send('Server Error');
        console.error(err.message);
      }
    }
  );
};
