const mongoose = require('mongoose');

const OurEventSchema = new mongoose.Schema({

  eName:String,
  venue:String,
  eType:String,
  eDate:Date,
  eTime:String,
  EventCoordinator:String
  
});

const OurEvents= mongoose.model('Events', OurEventSchema);

module.exports = OurEvents;



