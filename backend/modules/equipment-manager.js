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

var equipments = db.collection('equipments');
var accounts = db.collection('accounts');

exports.addEquipment = function(equipData, callback) {
  equipData.date = moment().format('MMMM Do YYYY, h:mm:ss');
  equipments.insert(equipData, {safe: true}, callback);
}

exports.updateEquipment = function(equipData, callback) {
  equipments.findOne({name: equipData.name}, function(e, o) {
    if (e) {
      callback(e, null);
    }
    else if (!o) {
      callback('the equipment does not exist');
    }
    else {
      o.name = equipData.name;
      o.category = equipData.category;
      o.available = equipData.available;
      equipments.save(o, {safe: true}, function(e) {
        if (e) callback(e);
        else callback(null, o);
      })
    }
  });
}

exports.deleteEquipment = function(name, callback) {
  equipments.remove({name: name}, callback);
}

exports.getEquipByName = function(name, callback) {
  equipments.findOne({name: name}, function(e, o) {callback(o);});
}

exports.getAllEquipments = function(callback) {
  equipments.find().toArray(function(e, res) {
    if (e)
      callback(e);
    else
    callback(null, res);
  });
}
