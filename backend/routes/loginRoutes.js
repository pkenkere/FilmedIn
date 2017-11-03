var path = require('path');

//var CT = require(path.join(__dirname, '..', 'modules', 'country-list'));
var AM = require(path.join(__dirname, '..', 'modules', 'account-manager'));
var EM = require(path.join(__dirname, '..', 'modules', 'email-dispatcher'));
var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));

module.exports = function(app) {

	// main login page //
    app.get('/', function(req, res){
        // check if the user's credentials are saved in a cookie //
        console.log(req.cookies.user, req.cookies.pass);
        if (req.cookies.user == undefined || req.cookies.pass == undefined){
            res.render('index', { title: 'FilmedIn' });
        }   else{
            // attempt automatic login //
            AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
                if (o != null){
                    req.session.user = o;
                    res.redirect('/home');
                }   else{
                    res.render('index', { title: 'FilmedIn' });
                }
            });
        }
    });

    app.post('/', function(req, res){
        AM.manualLogin(req.param('email'), req.param('pass'), function(e, o){
            if (!o){
                //console.log("MAA KIIII CHHUUUTTTTTT!!!!!");
                res.status(400).send(e);
            }   else{
                req.session.user = o;
                if (req.body['remember-me'] == 'true'){
                    res.cookie('email', o.user, { maxAge: 900000 });
                    res.cookie('pass', o.pass, { maxAge: 900000 });
                }
                res.status(200).send(o);
            }
        });
    });

    app.post('/logout', function(req, res){
        res.clearCookie('user');
        res.clearCookie('pass');
        req.session.destroy(function(e){ res.status(200).send('ok'); });
    })

    // creating new accounts //
    /*app.get('/signup', function(req, res) {
        res.render('signup', {  title: 'Signup', countries : CT });
    });*/

    app.post('/signup', function(req, res){
        var newData = {
          name    : req.param('name'),
          email   : req.param('email'),
          user    : req.param('user'),
          pass    : req.param('pass'),
          isAdmin : req.param('isAdmin'),
          //country : req.param('country'),
        };
        //console.log(newData);
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
    app.get('/printUsers', function(req, res) {
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

    app.post('/reset', function(req, res) {
        AM.delAllRecords(function(){
            //res.redirect('/print');
            res.send('ok');
        });
    });

    //app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });
};
