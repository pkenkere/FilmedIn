var moment      = require('moment');
var getObjectId = function(id)
{
    return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
    announcements.findOne({_id: getObjectId(id)},
            function(e, res) {
                if (e) callback(e)
                else callback(null, res)
            });
}

var announcements;
exports.init = function(db) {
  announcements = db.collection('announcements');
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
  findById(id, function(e,o){
    if(e || o == null) callback(1);
    else {
      announcements.remove({_id: getObjectId(id)}, function(e,o){
        if(e) callback(e);
        else callback(null, o);
      });
    }
  });
}

/*exports.announcementController = function(db) {
	this.announcements = db.collection('announcements');

	this.getAllAnnouncements = function(callback) {
		var _this = this;_this.announcements.find().toArray(callback);
	};
}*/
