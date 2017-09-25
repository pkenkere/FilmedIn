var mongoose = require('mongoose');
var userObject = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
      required: true,
      trim: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  passwordCheck: {
      type: String,
      required: true
  }
});
var User = mongoose.model('User', userObject);