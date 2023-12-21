const mongoose = require('mongoose');

const myEventSchema = new mongoose.Schema({
  email: String,
  eventIdObj: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events', // Reference to the Events model
  },
  category: String,
});

const MyEvents = mongoose.model('MyEvents', myEventSchema);

module.exports = MyEvents;
