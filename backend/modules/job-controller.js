var MongoDB     = require('mongodb').Db;
var Server      = require('mongodb').Server;
var moment      = require('moment');

/*
 *  ESTABLISH DATABASE CONNECTION
 *  */

var dbName = process.env.DB_NAME || 'filmedIn';
var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
    if (e) {
        console.log(e);
    } else {
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

var jobs = db.collection('jobs');

exports.getAllJobs = function(callback)
{
    jobs.find().toArray(
            function(e, res) {
                if (e) callback(e)
                else callback(null, res)
            });
}

exports.delAllJobs = function(callback)
{
    jobs.remove({}, callback); // reset accounts collection for testing //
}

exports.addJob = function (jobData,callback)
{
  jobData.dateCreated = moment().format('MMMM Do YYYY, h:mm:ss');
    jobs.save(jobData,function(e) {
      if(e) callback(e);
      else callback(null, jobData);
    });
}

exports.searchByGender = function(gender, callback) {
  jobs.find({"roles.gender" : gender}).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}

exports.searchByEthnicity = function(ethnicity, callback) {
  jobs.find({"roles.ethnicity" : ethnicity}).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}

exports.searchByRoleType = function(roleType, callback) {
  jobs.find({"roles.roleType" : roleType}).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}

exports.searchByAge = function(ageRange, callback) {
  jobs.find({"roles.age" : {$lte : ageRange.min , $gte : ageRange.max}}).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}

exports.searchByProdType = function(type, callback) {
  jobs.find({"prodDet.type" : type}).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}
