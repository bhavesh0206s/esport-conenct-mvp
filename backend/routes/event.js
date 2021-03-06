const express = require("express");
const { check, validationResult } = require("express-validator");
const Event = require("../models/Event");
const Profile = require("../models/Profile");
const verify = require("../verifytokenmw/verify_mv");
const mongoose = require("mongoose");
const HostProfile = require("../models/HostProfile");
const User = require("../models/User");
const { handlePushTokens } = require("../services/notification");

module.exports = (app) => {
  app.get("/api/event/allevents", verify, async (req, res) => {
    try {
      const events = await Event.find()
        .sort({ date: -1 })
        .select("-registeredteaminfo -registeredplayerinfo")
        .sort({ date: -1 });
      res.json(events);
    } catch (err) {
      console.error("fetchError: ", err.message);
      res.status(500).send("Server Error");
    }
  });

  app.get("/api/event/details/:eventId", verify, async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const eventDetails = await Event.findById({ _id: eventId });
      res.json(eventDetails);
    } catch (err) {
      console.error("fetchError: ", err.message);
      res.status(500).send("Server Error");
    }
  });

  app.get("/api/event/searchedevents/:eventname", async (req, res) => {
    try {
      const events = await Event.find({
        game: { $regex: "^" + req.params.eventname, $options: "i" },
      }).select("-registeredteaminfo -registeredplayerinfo");
      // .sort({ participants: -1 })
      // .limit(10);
      // This {{participants: -1}} means that event with the highest participants will be shown first
      res.json(events);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  app.post(
    "/api/event/add-event",
    [
      verify,
      [
        check("game", "You have to tell your game name to players")
          .not()
          .isEmpty(),
        check("description", "Hey please tell ur players about this event")
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
        hostedBy,
        hostedById,
      } = req.body;
      // build eventitems object
      let eventitems = {};
      eventitems.user = req.user.id;
      eventitems.hostedBy = hostedBy;
      eventitems.hostedById = hostedById;
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
            errors: [{ msg: "Sorry ur event was not posted" }],
          });
        }
        let hostProfile = await HostProfile.findOne({ user: req.user.id });
        hostProfile.myhostedevents.push(event);

        await hostProfile.save();

        if (!hostProfile) {
          return res.json({
            errors: [{ msg: "Sorry ur event was not saved in your profile" }],
          });
        }

        res.json(hostProfile.myhostedevents);
      } catch (err) {
        res.status(500).send("Server Error");
        console.error(err.message);
      }
    }
  );

  app.delete("/api/event/delete/:username", verify, async (req, res) => {
    try {
      const { _id, teamsize } = req.body.eventDetails;
      const currentUser = req.params.username;
      const user = await Profile.findOne({ user: req.user.id });
      const event = await Event.findById(_id);
      if (teamsize === 1) {
        //deleting from event
        let playersInfo = event.registeredplayerinfo;
        let updatedPlayersInfo = [];
        playersInfo.forEach((player) => {
          if (player.username !== user.username) {
            updatedPlayersInfo.push(player);
          }
        });
        event.registeredplayerinfo = updatedPlayersInfo;
        await event.save();

        //deleting from profile
        let myEvents = user.myevents;
        let updatedMyEvents = [];
        myEvents.forEach((event, i) => {
          if (event._id.toString() !== _id) {
            updatedMyEvents.push(event);
          }
        });
        user.myevents = updatedMyEvents;
        await user.save();
        res.json(user);
      } else {
        let teamsInfo = event.registeredteaminfo;
        ////deleting from profile
        let isTeamLeader = false;
        for (let useritem of teamsInfo) {
          for (let item of useritem.teammembersinfo) {
            if (item.teamLeader === currentUser) {
              isTeamLeader = true;
              break;
            }
          }
        }

        if (!isTeamLeader) {
          return res.status(404).json({
            errors: [{ msg: "You are not the Leader of the Team!!" }],
          });
        }

        for (let useritem of teamsInfo) {
          for (let item of useritem.teammembersinfo) {
            let playerProfile = await Profile.findOne({
              user: item.user,
            });

            let upadtedMyEvents = playerProfile.myevents.filter((event, i) => {
              if (event._id.toString() !== _id) return true;
            });
            playerProfile.myevents = upadtedMyEvents;

            await playerProfile.save();
          }
        }

        //deleting from event
        let upadtedTeamsInfo = [];
        let x = [];
        teamsInfo.forEach((team) => {
          x = team.teammembersinfo.filter((player) => {
            if (player.username !== user.username) {
              return true;
            }
          });
          if (x.length >= teamsize) {
            upadtedTeamsInfo.push(x);
          }
        });
        event.registeredteaminfo = teamsInfo
          .forEach((team, i) => ({ teammembersinfo: upadtedTeamsInfo[i] }))
          .filter((team) => team.teammembersinfo !== undefined);

        await event.save();

        res.json(user);
      }
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ errors: [{ msg: err.message }] });
    }
  });

  // Register in event
  // Array.isArray(v4)

  app.delete("/api/event/host/delete/:username", verify, async (req, res) => {
    try {
      const { _id, teamsize } = req.body.eventDetails;
      const currentUser = req.params.username;
      const event = await Event.findById(_id);

      if (teamsize === 1) {
        
        if(event.registeredplayerinfo !== null){
          let playersInfo = event.registeredplayerinfo;
          let updatedPlayersInfo = [];
          playersInfo.forEach((player) => {
            updatedPlayersInfo.push(player.username);
          });

          for (let player of updatedPlayersInfo) {
            const profile = await Profile.findOne({ username: player });
            let myEvents = profile.myevents;
            let updatedMyEvents = [];
            myEvents.forEach((event, i) => {
              if (event._id.toString() !== _id) {
                updatedMyEvents.push(event);
              }
            });
            profile.myevents = updatedMyEvents;
            await profile.save();
          }
        }
      } else {
        if (event.registeredteaminfo !== null) {
          let teamsInfo = event.registeredteaminfo;
          //deleting from profile
          for (let useritem of teamsInfo) {
            for (let item of useritem.teammembersinfo) {
              let playerProfile = await Profile.findOne({
                user: item.user,
              });

              let upadtedMyEvents = playerProfile.myevents.filter(
                (event, i) => {
                  if (event._id.toString() !== _id) return true;
                }
              );
              playerProfile.myevents = upadtedMyEvents;

              await playerProfile.save();
            }
          }
        }
      }

      Event.deleteOne({ _id: _id }, (err) => {
        if (err) return console.log(err)
      });

      const host = await HostProfile.findOne({ user: req.user.id });
      if (host.myhostedevents !== null) {
        let myHostedEvent = host.myhostedevents;

        myHostedEvent = myHostedEvent.filter(
          (event) => event._id.toString() !== _id
        );

        host.myhostedevents = myHostedEvent;
        await host.save();
      }
      res.json(host);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ errors: [{ msg: err.message }] });
    }
  });

  app.post("/api/event/register", verify, async (req, res) => {
    let { registerinfo, teamsize, eventId, hostId, eventdetails } = req.body;
    let title = eventdetails.title;
    let detail = `Registration for ${eventdetails.game} event successful`;
    try {
      let event = await Event.findById(eventId);
      let eventHost = await HostProfile.findOne({
        user: eventdetails.hostedById,
      });
      let notificationToken;
      let hostedevent = eventHost.myhostedevents.find(
        (event) => event.id === eventId
      );

      if (teamsize === 1) {
        let user = await User.findById(req.user.id);
        notificationToken = user.notificationToken;

        event.registeredplayerinfo.push(registerinfo);

        hostedevent.registeredplayerinfo.push(registerinfo);

        await eventHost.save();

        await event.save();

        let playerprofile = await Profile.findOne({
          user: registerinfo.user,
        });

        playerprofile.myevents.push(eventdetails);

        await playerprofile.save();

        handlePushTokens(notificationToken, { title, detail });

        res.json({ playerevents: playerprofile.myevents, event });
      } else {
        let teamsInfo = event.registeredteaminfo;

        if (teamsInfo.length > 0) {
          let registeredPlayerUsername = registerinfo.teammembersinfo.map(
            (item) => item.username
          );

          let alreadyRegisterPlayer = [];
          for (let useritem of teamsInfo) {
            for (let item of useritem.teammembersinfo) {
              if (registeredPlayerUsername.indexOf(item.username) !== -1) {
                alreadyRegisterPlayer.push(item.username);
              }
            }
          }

          if (alreadyRegisterPlayer.length > 0) {
            return res.status(404).json({
              errors: [
                {
                  msg: `${alreadyRegisterPlayer} Already Registered in this Event`,
                },
              ],
            });
          }
        }

        event.registeredteaminfo.push({
          teamname: registerinfo.teamname,
          teammembersinfo: registerinfo.teammembersinfo,
        });

        hostedevent.registeredteaminfo.push({
          teamname: registerinfo.teamname,
          teammembersinfo: registerinfo.teammembersinfo,
        });

        await event.save();

        await eventHost.save();

        registerinfo.teammembersinfo.forEach(async (useritem) => {
          try {
            let playerProfile = await Profile.findOne({
              user: useritem.user,
            });
            let user = await User.findById({ _id: useritem.user });

            playerProfile.myevents.push(eventdetails);

            await playerProfile.save();


            handlePushTokens(user.notificationToken, {title, detail})
          } catch (err) {
            console.error(err.message);
          }
        });

        res.json({ event });
      }
    } catch (err) {
      res.status(500).send("Server Error");
      console.error(err.message);
    }
  });

  app.post("/api/event/get-review/:hostId", verify, async(req, res) => {
    try{
      const host = await HostProfile.findOne({user: req.params.hostId});
      res.json(host.reviews);
    }catch(err){
      console.log('error form getReview: ',err.message)
    }
  }) 

  app.post("/api/event/post-review/:eventId", verify, async (req, res) => {
    const { reviewInfo, hostId } = req.body;
    try {
      let editreview = false;
      let user = await User.findById(req.user.id)
      // let event = await Event.findOne({ _id: req.params.eventId });
      let hostProfile = await HostProfile.findOne({ user: hostId });
      const reviewDetails = {};
      reviewDetails.name = user.name;
      reviewDetails.username = user.username
      reviewDetails.rating = reviewInfo.rating;
      reviewDetails.reviewText = reviewInfo.reviewText;
      reviewDetails.game = reviewInfo.game;
      reviewDetails.tournamentName = reviewInfo.tournamentName;

      let reviews = hostProfile.reviews;
      let foundReview = false
      for(let review of reviews){
        if((review.tournamentName === reviewDetails.tournamentName) && 
          (review.username === reviewDetails.username))
        {
          foundReview = true;
          break
        }
      }
      if(!foundReview){
        reviews.push(reviewDetails)
        await hostProfile.save();
        return res.status(200).json({
          success: { msg: "Thank You for Reviewing!" },
        });
      }else{
        return res.status(200).json({
          success: { msg: "You have already Reviewed!" },
        });
      }
    } catch (err) {
      console.error('error form postReview: ',err.message);
      res.status(500).send("Server Error");
    }
  });
};
