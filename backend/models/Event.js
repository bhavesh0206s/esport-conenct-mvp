const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  game: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    // required: true,
  },
  // time: {
  //   type: Date,
  // },
  entryFee: String,
  prizepool: Number,
  teamsize: Number,
  title: String,
  gamelink: String,
  registeredteaminfo: [
    {
      teamname: {
        type: String,
      },
      teammembersinfo: [
        {
          user: {
            type: Schema.Types.ObjectId,
          },
          email: {
            type: String,
          },
          name: {
            type: String,
          },
          number: {
            type: String,
          },
        },
      ],
    },
  ],
  registeredplayerinfo: [
    {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      number: {
        type: String,
      },
    },
  ],
  contact: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
