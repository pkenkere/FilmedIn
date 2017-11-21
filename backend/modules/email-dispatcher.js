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

EM.dispatchFeedback = function (account, callback) {
  var server = require("emailjs").server.connect(
          {
              host        : process.env.EMAIL_HOST || 'smtp.gmail.com',
              user        : process.env.EMAIL_USER || 'feedback.filmedin@gmail.com',
              password    : process.env.EMAIL_PASS || 'weshouldallknowit',
              ssl         : true,
          });
  server.send({
              from         : process.env.EMAIL_FROM || 'feedback.filmedin@gmail.com',
              to           : 'feedback.filmedin@gmail.com',
              subject      : 'Feedback Received',
              text         :  EM.composeFeedBack(account)
            }, callback );
}

EM.dispatchEquipmentCheckout = function (account, callback) {
  var server = require("emailjs").server.connect(
          {
              host        : process.env.EMAIL_HOST || 'smtp.gmail.com',
              user        : process.env.EMAIL_USER || 'feedback.filmedin@gmail.com',
              password    : process.env.EMAIL_PASS || 'weshouldallknowit',
              ssl         : true,
          });
  server.send({
              from         : process.env.EMAIL_FROM || 'feedback.filmedin@gmail.com',
              to           : 'feedback.filmedin@gmail.com',
              subject      : 'Equipment checked out',
              text         :  EM.composeEquipmentEmail(account)
            }, callback );
}

EM.composeFeedBack = function (acc) {
  var text = "You have received feedback from " + acc.email + ":\n\n";
  text += "Feedback: '" + acc.feedback + "'.\n";
  return text;
}

EM.composeEmail = function(o)
{
    var link = 'https://www.google.com';
    var glink = 'https://www.google.com';
    var text = "Hi " + o.name + ",\n\nYour username is " + o.user + "\n\n" + link +
            " Click here to reset your password.\n\n"+
            "Sincerely,\nFilemdIn Team"
    return  text;
}

EM.composeEquipmentEmail = function(o)
{
  var text = "The following user has rented out equipment:\n\nUser: " +
              o.user + "\n\nEquipment rented:\n\n";
  for (var i = 0; i < o.size; i++) {

    text+=o.equipments[i].name + " ==> Category: " + o.equipments[i].category + "\n";
  }
  return text;
}
