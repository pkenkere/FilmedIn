var moment = require('moment');

var reports;
var accounts;

exports.init = function(db) {
  reports = db.collection('reports');
  accounts = db.collection('accounts');
}

exports.addReport = function(email, newData, callback) {
  accounts.findOne({email:email}, function(e, o) {
    if (o == null) {
      callback('user-not-found');
    } else {
      newData.date = moment().format('MMMM Do YYYY, h:mm:ss');
      reports.insert(newData, {safe: true}, callback);
    }
  });
}

exports.getAllReports = function(callback) {
  reports.find().toArray(function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
  });
}
