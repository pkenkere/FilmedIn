var path = require('path');

var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));
var RM = require(path.join(__dirname, '..', 'modules', 'report-manager'));

module.exports = function(app, db) {
  PM.init(db);
  RM.init(db);

  app.post('/report', function(req, res) {
    RM.addReport(req.body.email, {
      reporter: req.body.email,
      title: req.body.title,
      description: req.body.description,
    }, function(e, o) {
      if (e) {
        console.log('error adding new report');
        res.status(500).send('error adding report');
      }
      else {
        console.log('report saved!!');
        res.status(200).send('ok');
        //send an email to the admin about the report
      }
    });
  });

  app.get('/printReports', function(req, res) {
    RM.getAllReports(function(e, reports) {
      if (e) {
        res.send('error in getting all reports');
      }
      else {
        res.send(reports);
      }
    });
  });
};
