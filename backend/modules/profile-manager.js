var MongoDB = require('mongodb').Db;
var Server = require('mongodb'). Server;
var moment = require('moment');

var dbName = process.env.DB_NAME || 'filmedIn';
var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
    if (e) {
        console.log(e);
    } else {
        //console.log(process.env.DB_USER);
        //console.log(process.env.DB_PASS);
        if (process.env.NODE_ENV == 'live') {
            db.authenticate(process.env.DB_USER, process.env.DB_PASS, function(e, res) {
                if (e) {
                    console.log('mongo :: error: not authenticated', e);
                }
                else {
                    console.log('mongo :: authenticated and connected to database :: "'+dbName+'"');
                }
            });
        }   else{
            console.log('mongo :: connected to database :: "'+dbName+'"');
        }
    }
});

var profiles = db.collection('profiles');
var accounts = db.collection('accounts');

exports.addProfileInfo = function(email, newData, callback) {
  accounts.findOne({email:email}, function(e, o) {
    if (o == null) {
      callback('user-not-found');
    } else {
      newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');;
      profiles.insert(newData, {safe: true}, callback);
    }
  });
}

exports.getProfileByEmail = function(email, callback) {
  profiles.findOne({email:email}, function(e, o) {callback(o)});
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

/*exports.deleteProfile = function(email, callback) {
  profiles.remove({});
}*/
