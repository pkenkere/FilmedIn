var path = require('path');

//var AM = require(path.join(__dirname, '..', 'modules', 'account-manager'));
var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));
var AM = require(path.join(__dirname, '..', 'modules', 'account-manager'));

module.exports = function(app) {
  // logged-in user homepage //
  app.get('/profile', function(req, res) {
      //console.log("MAA KI CHHUUUTTTTTT!!!");
      //if (req.session.user == null){
          // if user is not logged-in redirect back to login page //
        //  res.redirect('/');
      //} else {
          console.log("email received in the backend: " + req.query.email)
          PM.getProfileByEmail(req.query.email, function(err, o) {
            if (!o) {
              console.log("HERE!!!!");
              res.status(400).send(err);
            }
            else {
              console.log("I SHOULD BE HERE!!!!");
              res.setHeader('Content-Type', 'application/json');
              res.status(200).send(JSON.stringify(o));
            }
        });
      //}
  });

  app.post('/profile', function(req, res) {
    //if (req.session.user == null){
      //  res.redirect('/');
    //}
    //else {
        PM.getProfileByEmail(req.param('email'),
          function (e, o) {
            if (e) {
              res.status(400).send('error with profile');
            }
            else if (!o) {
              //var name;
              AM.getAccountByEmail(req.param('email'), function(o) {
                if (o) {
                  PM.addProfileInfo(req.param('email'), {
                    email : req.param('email'),
                    name : o.name,
                    age : req.param('age'),
                    gender : req.param('gender'),
                    ethnicity : req.param('ethnicity'),
                    education : req.param('education'),
                  }, function (e, o) {
                    if (e) {
                      console.log('error adding new account');
                      res.status(400).send('error adding profile');
                    }
                    else {
                      console.log('new profile added: ' + req.param('email'));
                      res.status(200).send('ok, new account added');
                    }
                  });
                }
                else
                  res.status(400).send('email-not-found');
              });

            }
            else {
               AM.getAccountByEmail(req.param('email'), function(o) {
                 if (o) {
                    PM.updateProfile(req.param('email'), {
                      email : req.param('email'),
                      //name : o.name,
                      //age : req.param('age'),
                      //gender : req.param('gender'),
                      //ethnicity : req.param('ethnicity'),
                      //education : req.param('education'),
                      major : req.param('major'),
                      year : req.param('year'),
                      interest : req.param('interest'),
                      // TODO : JOB updates
                    }, function (e, o) {
                      if (e) {
                        res.status(400).send('error-updating-account');
                      }
                      else {
                        console.log('new profile added');
                        res.status(200).send(o);
                      }
                    });
                  }
                else
                  res.status(400).send('email-not-found');
               });

            }
           });
    //}
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

  app.get('/profiles', function(req, res) {
    var criterias = {
       minAge : req.param('minAge'),
      // maxAge : req.param('maxAge'),
      // ethnicity : req.param('ethnicity'),
      // gender : req.param('gender')
    }
    console.log("log from routes minAge: " + criterias.minAge + " " + criterias.maxAge + " " + criterias.ethnicity + " " + criterias.gender);
    PM.getProfiles(criterias, function(e, profiles) {
      if (e) {
        res.send('error in searching for profiles');
      }
      else {
        res.send(profiles);
      }
    });
  });

  app.post('/deleteProfile', function(req, res) {
    PM.deleteProfile(req.param('email'), function(e) {
      if (e)
        callback('error while deleting profile');
      else
        res.status(200).send('profile deleted');
    })
  });

};
