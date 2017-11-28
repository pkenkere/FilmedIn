var moment      = require('moment');

//var profiles = db.collection('profiles');
var accounts;
var feedbacks;

exports.init = function(db){
  accounts = db.collection('accounts');
  feedbacks = db.collection('feedbacks');
}

exports.addFeedback = function(email, newData, callback) {
  //console.log("from profile-manager modules, adding new profile");
  accounts.findOne({email:email}, function(e, o) {
    if (o == null) {
      callback('user-not-found');
    } else {
      newData.date = moment().format('MMMM Do YYYY, h:mm:ss');
      feedbacks.insert(newData, {safe: true}, callback);
      //console.log("from modules, added new profile");
    }
  });
}

exports.getAllFeedbacks = function(callback) {
  feedbacks.find().toArray(function(e, res) {
    if (e)
      callback(e);
    else
      callback(null, res);
  });
}
