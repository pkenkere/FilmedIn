var path = require('path');

var CT = require(path.join(__dirname, '..', 'modules', 'country-list'));
var AM = require(path.join(__dirname, '..', 'modules', 'account-manager'));
var EM = require(path.join(__dirname, '..', 'modules', 'email-dispatcher'));
var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));

module.exports = function(app) {
  /*app.get('/profile/:user',function(req,res){
        if(req.session.user == null){
       res.redirect('/');
    }  else{
       console.log(req.params);
       if(req.params.user == req.session.user.user){
        res.send("" + req.session.user.name + "'s profile!");
       }
       else{
        res.send("User profile inaccessible. Login First");
       }
    }
  });*/

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
        PM.updateProfile(req.param('email'), {
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
            res.status(200).send('ok');
          }
        });
    }
  });
};
