var path = require('path');

//var CT = require(path.join(__dirname, '..', 'modules', 'country-list'));
var AM = require(path.join(__dirname, '..', 'modules', 'account-manager'));
var EM = require(path.join(__dirname, '..', 'modules', 'email-dispatcher'));
var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));
var FM = require(path.join(__dirname, '..', 'modules', 'feedback-manager'));

module.exports = function(app,db) {
  AM.init(db);
  PM.init(db);
  FM.init(db);
  app.post('/feedback', function(req, res) {
    var email = req.body.email;
    var newData = {
      email: email,
      feedback: req.body.feedback,
    };

    FM.addFeedback(email, newData, function(e, o) {
      if (e){
          res.status(400).send(e);
      }   else{
          //res.status(200).send('ok');
          console.log('feedback added');
      }
    });

    var name;
    AM.getAccountByEmail(email, function(o) {
      if (o) {
        name = o.name;
      }
      else {
        res.status(400).send('email was not found');
      }
    });

    newData.name = name;
    EM.dispatchFeedback(newData, function(e) {
      if (!e) {
        res.status(200).send('ok, email was dispatched to admin about the feedback');
      }
      else {
        res.status(400).send('unable to dispatch feedback email');
      }
    });
  });

  app.get('/printFeedbacks', function(req, res) {
    FM.getAllFeedbacks( function(e, feedbacks){
        //res.render('print', { title : 'Account List', accts : accounts });
        res.send(feedbacks);
    })
  });
};
