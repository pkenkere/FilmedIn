var path = require('path');

//var AM = require(path.join(__dirname, '..', 'modules', 'account-manager'));
var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));
var AM = require(path.join(__dirname, '..', 'modules', 'account-manager'));


module.exports = function(app,db) {

  PM.init(db);
  AM.init(db);
  // logged-in user homepage //
  app.get('/profile', function(req, res) {
          PM.getProfileByEmail(req.query.email, function(err, o) {
            if (!o) {
              res.status(400).send(err);
            }
            else {
              res.setHeader('Content-Type', 'application/json');
              res.status(200).send(JSON.stringify(o));
            }
        });
  });

  app.post('/profile', function(req, res) {
        PM.getProfileByEmail(req.param('email'),
          function (e, o) {
            if (e) {
              res.status(400).send('error with profile');
            }
            else if (!o) {
              //var name;
              AM.getAccountByEmail(req.param('email'), function(o) {
                if (o) {
                  var jobsPosted = new Array();
                  var equips = new Array();
                  var pastJobs = new Array();
                  PM.addProfileInfo(req.param('email'), {
                    email : req.param('email'),
                    name : o.name,
                    age : req.param('age'),
                    gender : req.param('gender'),
                    pastJobs : pastJobs,
                    ethnicity : req.param('ethnicity'),
                    education : req.param('education'),
                    instagramLink : req.param('instagramLink'),
                    facebookLink : req.param('facebookLink'),
                    linkedInLink : req.param('linkedInLink'),
                    resumeLink : req.param('resumeLink'),
                    jobsPosted : jobsPosted,
                    equipments: equips //array of arrays of equipments checked out
                  }, function (e, o) {
                    if (e) {
                      console.log('error adding new account');
                      res.status(500).send('error adding profile');
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
                      major : req.param('major'),
                      year : req.param('year'),
                      interest : req.param('interest'),
                      instagramLink : req.param('instagramLink'),
                      facebookLink : req.param('facebookLink'),
                      linkedInLink : req.param('linkedInLink'),
                      resumeLink : req.param('resumeLink'),
                      pastJob_name : req.param('pastJobs').job_name,
                      pastJob_desc : req.param('pastJobs').job_desc
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
    var criterias = {};
    if (req.query.name != null && req.query.name != undefined)
      criterias.name = req.query.name;
    if (req.query.ethnicity != null && req.query.ethnicity != undefined)
      criterias.ethnicity = req.query.ethnicity;
    if (req.query.gender != null  && req.query.gender != undefined)
      criterias.gender = req.query.gender;
    if(req.query.minAge != null  && req.query.minAge != undefined) {
			criterias["age"] = criterias["age"] || {};
			criterias["age"]["$gte"] = req.query.minAge;
		}
		if(req.query.maxAge != null  && req.query.maxAge != undefined) {
			criterias["age"] = criterias["age"] || {};
			criterias["age"]["$lte"] = req.query.maxAge;
		}
    console.log("log from routes minAge: " + req.query.minAge + " " + req.query.maxAge + " " + req.query.ethnicity + " " + req.query.gender);
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
    PM.deleteProfile(req.body.id, function(e) {
      if (e)
        res.status(400).send('error while deleting profile');
      else
        res.status(200).send('profile deleted');
    });
  });

  app.post('/resetProfiles', function(req, res) {
    PM.delAllRecords(function(){
      res.send('ok');
    });
  });

};
