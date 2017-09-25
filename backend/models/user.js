var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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

//user authentication with database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

var User = mongoose.model('User', userObject);
module.exports = User;
