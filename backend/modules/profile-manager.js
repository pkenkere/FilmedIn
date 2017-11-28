var moment      = require('moment');

var profiles;
var accounts;

exports.init = function(db){
  profiles = db.collection('profiles');
  accounts = db.collection('accounts');
}

exports.addProfileInfo = function(email, newData, callback) {
  //console.log("from profile-manager modules, adding new profile");
  accounts.findOne({email:email}, function(e, o) {
    if (o == null) {
      callback('user-not-found');
    } else {
      newData.date = moment().format('MMMM Do YYYY, h:mm:ss');
      profiles.insert(newData, {safe: true}, callback);
      //console.log("from modules, added new profile");
    }
  });
}

exports.updateProfile = function(email, newData, callback) {
  profiles.findOne({email:email}, function(e, o) {
    if (o == null) {
      callback('user-not-found');
    }
    else {
      //o.email = newData.email;
      //o.name  = newData.name;
      //o.age = newData.age;
      //o.gender = newData.gender;
      //o.ethnicity = newData.ethnicity;
      //o.education = newData.education;
      if (newData.major != '')
        o.major = newData.major;
      if (newData.year != '')
        o.year = newData.year;
      if (newData.interest != '')
        o.interest = newData.interest;
      if (newData.instagramLink != '')
        o.instagramLink = newData.instagramLink;
      if (newData.facebookLink != '')
        o.facebookLink = newData.facebookLink;
      if (newData.linkedInLink != '')
        o.linkedInLink = newData.linkedInLink;
      if (newData.resumeLink != '')
        o.resumeLink = newData.resumeLink;
      if (newData.jobPosted != '')
          o.jobsPosted.push(newData.jobPosted);
      o.date = moment().format('MMMM Do YYYY, h:mm:ss a');;
      profiles.save(o, {safe: true}, function (e) {
        if (e) callback(e);
        else callback(null, o);
      });
    }
  });
}

exports.getProfileByEmail = function(email, callback) {
  profiles.findOne({email:email}, function(e, o) {
    if (e)
      callback('user-not-found');
    else
      callback(null, o);
  });
}

exports.getAllProfiles = function(callback) {
  profiles.find().toArray(
    function(e, res) {
      if (e)
        callback(e);
      else
        callback(null, res);
    });
}

exports.getProfiles = function(criterias, callback) {
  console.log("log from manager minAge: " + criterias.minAge);
  profiles.find({
    age: { $gt : criterias.minAge, $lt : criterias.maxAge },
    ethnicity : criterias.ethnicity,
    gender : criterias.gender
  }).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}

exports.deleteProfile = function(email, callback) {
  profiles.remove({email: email}, callback);
}
