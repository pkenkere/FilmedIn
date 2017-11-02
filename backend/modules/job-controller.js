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

var getObjectId = function(id)
{
    return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
    jobs.findOne({_id: getObjectId(id)},
            function(e, res) {
                if (e) callback(e)
                else callback(null, res)
            });
}

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
    jobs.remove({}, callback); // reset job list for testing //
}

exports.addJob = function (jobData,callback)
{
  jobData.dateCreated = moment().format('MMMM Do YYYY, h:mm:ss');
    jobs.save(jobData,function(e) {
      if(e) callback(e);
      else callback(null, jobData);
    });
}

exports.search = function (criterias, callback) {
  jobs.find(criterias).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}

exports.deleteJob = function(id, callback)
{
  findById(id, function(e,o){
    if(e || o == null) callback(1);
    else {
      jobs.remove({_id: getObjectId(id)}, function(e,o){
        if(e) callback(e);
        else callback(null, o);
      });
    }
  });
}
