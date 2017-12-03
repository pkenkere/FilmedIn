var path = require('path');

var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));
var RM = require(path.join(__dirname, '..', 'modules', 'report-manager'));
var EM = require(path.join(__dirname, '..', 'modules', 'email-dispatcher'));

module.exports = function(app, db) {
  PM.init(db);
  RM.init(db);

  app.post('/report', function(req, res) {
    RM.addReport(req.body.email, {
      announcementID : req.body.AnnID,
      reporter: req.body.email,
      title: req.body.title,
      description: req.body.description,
    }, function(e, o) {
      if (e) {
        console.log('error adding new report');
        res.status(500).send('error adding report');
      }
      else {
        var report = {
          email : req.body.email,
          title : req.body.title,
          desc : req.body.description
        }
        EM.dispatchReport(report, function(e){
          if (!e) {
            res.status(200).send('ok, email was dispatched to admin about the report');
          }
          else {
            res.status(400).send('unable to dispatch report email');
          }
        });
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

  app.post('/deleteReport', function(req, res) {
    RM.deleteReport(req.body.id, function(e) {
      if (e)
        res.status(400).send('error while deleting report');
      else
        res.status(200).send('report deleted');
    });
  });

  app.post('/resetReports', function(req, res) {
    RM.delAllRecords(function(){
      res.send('ok');
    });
  });
};
