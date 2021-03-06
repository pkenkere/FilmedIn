var moment = require('moment');

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
      //console.log(o);
      console.log("name: " + o.name);
      console.log("email: " + o.email);
      var pastJob = {};
      if (newData.major != '' && newData.major != null)
        o.major = newData.major;
      if (newData.year != '' && newData.year != null)
        o.year = newData.year;
      if (newData.interest != '' && newData.interest != null)
        o.interest = newData.interest;
      if (newData.instagramLink != '' && newData.instagramLink != null)
        o.instagramLink = newData.instagramLink;
      if (newData.facebookLink != '' && newData.facebookLink != null)
        o.facebookLink = newData.facebookLink;
      if (newData.linkedInLink != '' && newData.linkedInLink != null)
        o.linkedInLink = newData.linkedInLink;
      if (newData.resumeLink != '' && newData.resumeLink != null)
        o.resumeLink = newData.resumeLink;
      if (newData.pastJob_name != '' && newData.pastJob_name != null) {
        pastJob.pastJob_name = newData.pastJob_name;
        pastJob.pastJob_desc = newData.pastJob_desc;
        var pastJobs = o.pastJobs;
        pastJobs.push(pastJob);
        o.pastJobs = pastJobs;
      }
      if (newData.jobPosted != '' && newData.jobPosted != null) {
        console.log("jobs posted: " + o.jobsPosted);
        var jobs = o.jobsPosted;
        jobs.push(newData.jobPosted);
        o.jobsPosted = jobs;
      }
      if (newData.equipments != '' || newData.equipments != null) {
        o.dateFrom = newData.dateFrom;
        o.dateTo = newData.dateTo;
        if (newData.flag == false) {
          // var equips = o.equipments;
          // equips.push(newData.equipments);
          o.equipments = newData.equipments;
        }
        else {
          o.equipments = newData.equipments;
        }
      }
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
  profiles.find(criterias).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}

exports.deleteProfile = function(id, callback) {
  profiles.remove({_id: getObjectId(id)}, callback);
}

exports.delAllRecords = function(callback)
{
    profiles.remove({}, callback); // reset accounts collection for testing //
}

var getObjectId = function(id)
{
    return new require('mongodb').ObjectID(id);
}
