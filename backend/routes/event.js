const express = require('express');
const { check, validationResult } = require('express-validator');
const Event = require('../models/Event');
const Profile = require('../models/Profile');
const verify = require('../verifytokenmw/verify_mv');
const mongoose = require('mongoose');

module.exports = (app) => {
  app.get('/api/event/allevents', verify, async (req, res) => {
    try {
      const events = await Event.find()
        .select('-registeredteaminfo -registeredplayerinfo')
        .sort({ date: -1 });
      res.json(events);
    } catch (err) {
      console.error('fetchError: ', err.message);
      res.status(500).send('Server Error');
    }
  });

  app.delete('/api/event/delete/registered/:id', verify ,async (req, res) => {
    try{
      const id = req.params.id
      const user = await Profile.findOne({user: req.user.id})
      let myEvents = user.myevents
      let updatedMyEvents =  []
      myEvents.forEach((event, i) => {
        if(event._id.toString() !== id){
          updatedMyEvents.push(event)
        }
      })
      user.myevents = updatedMyEvents
      await user.save()
      res.json(user);
    }catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })

  app.get('/api/event/searchedevents/:eventname', async (req, res) => {
    try {
      const events = await Event.find({
        game: { $regex: '^' + req.params.eventname, $options: 'i' },
      }).select('-registeredteaminfo -registeredplayerinfo');
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
        prizepool,
        time,
        username,
      } = req.body;
      // build eventitems object
      let eventitems = {};
      eventitems.user = req.user.id;
      eventitems.hostedBy = username;
      if (game) eventitems.game = game;
      if (description) eventitems.description = description;
      if (title) eventitems.title = title;
      if (entryFee) eventitems.entryFee = entryFee;
      if (contact) eventitems.contact = contact;
      if (teamsize) eventitems.teamsize = teamsize;
      if (prizepool) eventitems.prizepool = prizepool;
      if (time) eventitems.time = time;

      try {
        let event = new Event(eventitems);

        let eventsuccess = await event.save();

        if (!eventsuccess) {
          return res.json({
            errors: [{ msg: 'Sorry ur event was not posted' }],
          });
        }

        let profile = await Profile.findOne({ user: req.user.id });

        profile.myhostedevents.push(event);

        await profile.save();

        if (!profile) {
          return res.json({
            errors: [{ msg: 'Sorry ur event was not saved in your profile' }],
          });
        }

        res.json(profile.myhostedevents);
      } catch (err) {
        res.status(500).send('Server Error');
        console.error(err.message);
      }
    }
  );

  // Register in event
  // Array.isArray(v4)
  app.post('/api/event/registerinevent', verify, async (req, res) => {
    let {
      registerinfo,
      teamsize,
      eventId,
      usereventId,
      eventdetails,
    } = req.body;

    try {
      let event = await Event.findById(eventId);
      let eventhostguy = await Profile.findOne({ user: usereventId });

      // Pull out the event
      let hostedevent = eventhostguy.myhostedevents.find(
        (event) => event.id === eventId
      );

      if (teamsize <= 1) {
        event.registeredplayerinfo.push(registerinfo);

        hostedevent.registeredplayerinfo.push(registerinfo);

        await eventhostguy.save();

        await event.save();

        let playerprofile = await Profile.findOne({
          user: registerinfo.user,
        });

        playerprofile.myevents.push(eventdetails);

        await playerprofile.save();

        res.json({ playerevents: playerprofile.myevents, event });
      } else {
        event.registeredteaminfo.push({
          teamname: registerinfo.teamname,
          teammembersinfo: registerinfo.teammembersinfo,
        });

        hostedevent.registeredteaminfo.push({
          teamname: registerinfo.teamname,
          teammembersinfo: registerinfo.teammembersinfo,
        });

        await event.save();

        await eventhostguy.save();

        registerinfo.teammembersinfo.forEach(async (useritem) => {
          try {
            let playerprofile = await Profile.findOne({
              user: useritem.user,
            });

            playerprofile.myevents.push(eventdetails);

            await playerprofile.save();
          } catch (err) {
            console.error(err.message);
          }
        });

        res.json({ event });
      }
    } catch (err) {
      res.status(500).send('Server Error');
      console.error(err.message);
    }
  });
};
