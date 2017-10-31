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

var announcements = db.collection('announcements');

var getObjectId = function(id)
{
    return new require('mongodb').ObjectID(id);
}

exports.addAnnouncement = function(annData, callback)
{
  annData.dateCreated = moment().format('MMMM Do YYYY, h:mm:ss a');
  announcements.insert(annData, function(e,o){
		if(e) callback(e);
		else callback(null, annData);
	});
}

exports.getAllAnnouncements  = function(callback)
{
	announcements.find().toArray(
					function(e, res) {
							if (e) callback(e)
							else callback(null, res)
					});
}

exports.delAllAnnouncements = function(callback){
  announcements.remove({},callback);
}

exports.deleteAnnouncement = function(id, callback)
{
    announcements.remove({_id: getObjectId(id)}, function(e,o){
      if(e) callback(e);
      else callback(null, o);
    });
}

/*exports.announcementController = function(db) {
	this.announcements = db.collection('announcements');

	this.getAllAnnouncements = function(callback) {
		var _this = this;_this.announcements.find().toArray(callback);
	};
}*/
