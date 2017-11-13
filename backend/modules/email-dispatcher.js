var EM = {};
module.exports = EM;

EM.dispatchResetPasswordLink = function(account, callback)
{


  var server = require("emailjs").server.connect(
          {
              host        : process.env.EMAIL_HOST || 'smtp.gmail.com',
              user        : process.env.EMAIL_USER || 'feedback.filmedin@gmail.com',
              password    : process.env.EMAIL_PASS || 'weshouldallknowit',
              ssl         : true,
          });
    server.send({
        from         : process.env.EMAIL_FROM || 'feedback.filmedin@gmail.com',
        to           : account.email,
        subject      : 'Password Reset',
        text         :  EM.composeEmail(account)
      }, callback );
        }

EM.composeEmail = function(o)
{
    //var link = 'https://nodejs-login.herokuapp.com/reset-password?e='+o.email+'&p='+o.pass;
    var link = 'https://www.google.com';
    var glink = 'https://www.google.com';
    var html = "<html><body>";
    html += "Hi "+o.name+",<br><br>";
    html += "Your username is <b>"+o.user+"</b><br><br>";
    html += "<a href='"+link+"'>Click here to reset your password</a><br><br>";
    html += "Cheers,<br>";
    html += "<a href='https://www.google.com'>google</a><br><br>";
    html += "</body></html>";
    html = "Hi " + o.name + ",\n\nYour username is " + o.user + "\n\n" + link +
            " Click here to reset your password.\n\n"+
            "Sincerely,\nFilemdIn Team"
    return  html;
}
