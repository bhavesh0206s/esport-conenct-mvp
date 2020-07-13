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
  eventdate: {
    from: Date,
    to: Date,
    hours: String,
  },
  prizepool: Number,
  teamsize: Number,
  title: String,
  gamelink: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
