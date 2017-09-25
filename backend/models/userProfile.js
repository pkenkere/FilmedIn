var mongoose = require('mongoose');
var roleObj = new mongoose.Schema({
    index: Number,
    role: {
        type: String,
        enum: ['Actor', 'CameraMan', 'Director', 'Producer'],
        required: true
    },
    description:String  //Should we include desc and index????
})
var userObject = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
      required: true,
      trim: true
  },
  name: String,
  age: Number,
  gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  },
  roles: [roleObj],
  userType: {
      type: String,
      enum: ['Admin', 'User']
  },
  height: Number,
  weight: Number
});
var User = mongoose.model('User', userObject);