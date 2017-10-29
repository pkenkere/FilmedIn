var EM = {};
module.exports = EM;

EM.server = require("emailjs").server.connect(
        {
            host        : process.env.EMAIL_HOST || 'smtp.gmail.com',
            user        : process.env.EMAIL_USER || 'feedback.filmedin@gmail.com',
            password    : process.env.EMAIL_PASS || 'weshouldallknowit',
            ssl         : true,
            port        : 587
        });
EM.sendMail= function(toMailId, ccMailId, subject, content, senderId, attachment){

  var USE_SEND_GRID = true;
  var nodemailer = require('nodemailer');
  var transport = null;
  if (USE_SEND_GRID){
    var sgTransport = require('./sendgridTransport.js');
    transport = nodemailer.createTransport(sgTransport({
                  auth: {
                    api_user: 'paraskhonde',
                    api_key: 'India!23'
                  }
                }));
  } else {
    transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'feedback.filmedin@gmail.com',
								pass: 'weshouldallknowit'
            }
          });
  }
  console.log('sending');
		transport.sendMail(
			{
				from: senderId,
				to: toMailId,
				cc: ccMailId,
				subject: subject,
				html: content,
				text: '',
				attachments: attachment
			}, function(err, responseStatus) {
        console.log('response err', err);
        console.log('response responseStatus', responseStatus);
				if (err) {
					console.log(err);
				} else {
					console.log('mail status : ' + responseStatus.message);
				}
			}
		);
	};

EM.dispatchResetPasswordLink = function(account, callback)
{
  EM.sendMail( "paras@motifworks.com", null, 'Password Reset', EM.composeEmail(account), 'feedback.filmedin@gmail.com', null);
  callback(null, null);
  /*
  var server = require("emailjs").server.connect(
          {
              host        : process.env.EMAIL_HOST || 'smtp.gmail.com',
              user        : process.env.EMAIL_USER || 'feedback.filmedin@gmail.com',
              password    : process.env.EMAIL_PASS || 'weshouldallknowit',
              ssl         : true,
              port        : 587
          });
    server.send({
        from         : process.env.EMAIL_FROM || 'feedback.filmedin@gmail.com',
        to           : account.email,
        subject      : 'Password Reset',
        text         :  EM.composeEmail(account)
      }, callback );*/
        }

EM.composeEmail = function(o)
{
    //var link = 'https://nodejs-login.herokuapp.com/reset-password?e='+o.email+'&p='+o.pass;
    var link = 'https://www.google.com';
    var html = "<html><body>";
    html += "Hi "+o.name+",<br><br>";
    html += "Your username is <b>"+o.user+"</b><br><br>";
    html += "<a href='"+link+"'>Click here to reset your password</a><br><br>";
    html += "Cheers,<br>";
    html += "<a href='https://www.google.com'>google</a><br><br>";
    html += "</body></html>";
    return  html;
}
