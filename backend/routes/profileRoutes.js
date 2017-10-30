var path = require('path');

//var AM = require(path.join(__dirname, '..', 'modules', 'account-manager'));
var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));

module.exports = function(app) {
  // logged-in user homepage //
  app.get('/profile', function(req, res) {
      if (req.session.user == null){
          // if user is not logged-in redirect back to login page //
          res.redirect('/');
      } else {
          PM.getProfileByEmail(req.param('email'), function(err, o) {
            if (!o) {
              res.status(400).send(e);
            }
            else {
              res.send(o);
            }
        });
      }
  });

  app.post('/profile', function(req, res) {
    if (req.session.user == null){
        res.redirect('/');
    }
    else {
        PM.getProfileByEmail(req.param('email'),
          function (e, o) {
            if (e) {
              res.status(400).send('error with profile');
            }
            else if (!o) {
              PM.addProfileInfo(req.param('email'), {
                email : req.param('email'),
                name : req.param('name'),
                age : req.param('age'),
                gender : req.param('gender'),
                ethnicity : req.param('ethnicity'),
                education : req.param('education'),
              }, function (e, o) {
                if (e) {
                  res.status(400).send('error adding profile');
                }
                else {
                  res.status(200).send('ok, new account added');
                }
              });
            }
            else {
              PM.updateProfile(req.param('email'), {
                email : req.param('email'),
                name : req.param('name'),
                age : req.param('age'),
                gender : req.param('gender'),
                ethnicity : req.param('ethnicity'),
                education : req.param('education'),
              }, function (e, o) {
                if (e) {
                  res.status(400).send('error-updating-account');
                }
                else {
                  res.status(200).send('ok, account updated');
                }
              });
            }
           });
    }
  });

  app.get('/printProfiles', function(req, res) {
    PM.getAllProfiles(function(e, profiles) {
      if (e) {
        res.send('error in getting all profiles');
      }
      else {
        res.send(profiles);
      }
    });
  });
};