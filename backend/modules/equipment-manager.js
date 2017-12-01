var moment      = require('moment');
var equipments;
var accounts;

exports.init = function(db){
  equipments = db.collection('equipments');
  accounts = db.collection('accounts');
}

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

exports.deleteEquipment = function(id, callback) {
  equipments.remove({_id: getObjectId(id)}, callback);
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

exports.deleteEquipment = function(id, callback) {
  equipments.remove({_id: getObjectId(id)}, callback);
}

exports.delAllRecords = function(callback)
{
    equipments.remove({}, callback); // reset accounts collection for testing //
}

var getObjectId = function(id)
{
    return new require('mongodb').ObjectID(id);
}
