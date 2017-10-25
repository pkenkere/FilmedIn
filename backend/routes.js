var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');
var PM = require('./modules/profile-manager');

module.exports = function(app) {

    // main login page //
    app.get('/', function(req, res){
        // check if the user's credentials are saved in a cookie //
        if (req.cookies.user == undefined || req.cookies.pass == undefined){
            res.render('login', { title: 'FilmedIn' });
        }   else{
            // attempt automatic login //
            AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
                if (o != null){
                    req.session.user = o;
                    res.redirect('/home');
                }   else{
                    res.render('login', { title: 'FilmedIn' });
                }
            });
        }
    });

    app.post('/', function(req, res){
        AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
            if (!o){
                res.status(400).send(e);
            }   else{
                req.session.user = o;
                if (req.body['remember-me'] == 'true'){
                    res.cookie('user', o.user, { maxAge: 900000 });
                    res.cookie('pass', o.pass, { maxAge: 900000 });
                }
                res.status(200).send(o);
            }
        });
    });

    app.get('/profile/:user',function(req,res){
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
    });

    // logged-in user homepage //
    app.get('/profile', function(req, res) {
        if (req.session.user == null){
            // if user is not logged-in redirect back to login page //
            res.redirect('/');
        }   else{
            /*res.render('home', {
                title : 'Control Panel',
                //countries : CT,
                udata : req.session.user
            });*/

        }
    });

    app.post('/home', function(req, res){
        if (req.session.user == null){
            res.redirect('/');
        }   else{
            AM.updateAccount({
                id      : req.session.user._id,
                name    : req.param('name'),
                email   : req.param('email'),
                pass    : req.param('pass'),
                //country : req.param('country')
            }, function(e, o){
                if (e){
                    res.status(400).send('error-updating-account');
                }   else{
                    req.session.user = o;
                    // update the user's login cookies if they exists //
                    if (req.cookies.user != undefined && req.cookies.pass != undefined){
                        res.cookie('user', o.user, { maxAge: 900000 });
                        res.cookie('pass', o.pass, { maxAge: 900000 });
                    }
                    res.status(200).send('ok');
                }
            });
        }
    });

    app.post('/logout', function(req, res){
        res.clearCookie('user');
        res.clearCookie('pass');
        req.session.destroy(function(e){ res.status(200).send('ok'); });
    })

    // creating new accounts //
    app.get('/signup', function(req, res) {
        res.render('signup', {  title: 'Signup', countries : CT });
    });

    app.post('/signup', function(req, res){
        var newData = {
          name    : req.param('name'),
          email   : req.param('email'),
          user    : req.param('user'),
          pass    : req.param('pass'),
          //country : req.param('country'),
        };
        AM.addNewAccount(newData, function(e){
            if (e){
                res.status(400).send(e);
            }   else{
                res.status(200).send('ok');
            }
        });
    });

    // password reset //
    app.post('/lost-password', function(req, res){
        // look up the user's account via their email //
        AM.getAccountByEmail(req.param('email'), function(o){
            if (o){
                EM.dispatchResetPasswordLink(o, function(e, m){
                    // this callback takes a moment to return //
                    //              // TODO add an ajax loader to give user feedback //
                    if (!e){
                        res.status(200).send('ok');
                    }   else{
                        for (k in e) console.log('ERROR : ', k, e[k]);
                        res.status(400).send('unable to dispatch password reset');
                    }
                });
            }   else {
                res.status(400).send('email-not-found');
            }
        });
    });

    app.get('/reset-password', function(req, res) {
        var email = req.query["e"];
        var passH = req.query["p"];
        AM.validateResetLink(email, passH, function(e){
            if (e != 'ok'){
                res.redirect('/');
            } else{
                // save the user's email in a session instead of sending to the client //
                req.session.reset = { email:email, passHash:passH };
                res.render('reset', { title : 'Reset Password' });
            }
        })
    });

    app.post('/reset-password', function(req, res) {
        var nPass = req.body['pass'];
        // retrieve the user's email from the session to lookup their account and reset password //
        var email = req.session.reset.email;
        // destory the session immediately after retrieving the stored email //
        req.session.destroy();
        AM.updatePassword(email, nPass, function(e, o){
            if (o){
                res.status(200).send('ok');
            }   else{
                res.status(400).send('unable to update password');
            }
        })
    });

    // view & delete accounts //
    app.get('/print', function(req, res) {
        AM.getAllRecords( function(e, accounts){
            //res.render('print', { title : 'Account List', accts : accounts });
            res.send(accounts);
        })
    });

    app.post('/delete', function(req, res){
        AM.deleteAccount(req.body.id, function(e, obj){
            if (!e){
                res.clearCookie('user');
                res.clearCookie('pass');
                req.session.destroy(function(e){ res.status(200).send('ok'); });
            }   else{
                res.status(400).send('record not found');
            }
        });
    });

    app.get('/reset', function(req, res) {
        AM.delAllRecords(function(){
            res.redirect('/print');
        });
    });

    app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};
