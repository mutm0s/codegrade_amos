const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  email:String,
  names:String,
  privileges:String,
  program:String,
  gy:String,
  type:String
  
});

const User= mongoose.model('Users', UserSchema);

module.exports = User;



