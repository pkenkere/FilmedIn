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

EM.dispatchReport = function (account, callback) {
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
              subject      : 'Annoucement reported: '+account.title,
              text         :  EM.composeReport(account)
            }, callback );
}

EM.dispatchEquipmentCancellation = function (account, callback) {
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
              subject      : 'Annoucement reported: '+account.title,
              text         :  EM.composeCancelEquipment(account)
            }, callback );
}

EM.composeFeedBack = function (acc) {
  var text = "You have received feedback from " + acc.email + ":\n\n";
  text += "Feedback: '" + acc.feedback + "'.\n";
  return text;
}

EM.composeEmail = function(o)
{
    var link = 'http://' + o.host + '/reset-password/';
    var glink = 'https://www.google.com';
    var text = "Hi " + o.name + ",\n\nYour username is " + o.user + "\n\n" + link +
            " Click here to reset your password.\n\n"+
            "Sincerely,\nFilemdIn Team"
    return text;
}

EM.composeEquipmentEmail = function(o)
{
  var text = "The following user has requested to rent out equipment from " + o.dateFrom + " to " + o.dateTo + "\n\nUser: " +
              o.email + "\n\nEquipment rented:\n\n";
  for (var i = 0; i < o.equipments.length; i++) {

    text += o.equipments[i].name + " ==> Category: " + o.equipments[i].category + "\n";
  }
  return text;
}

EM.composeReport = function (acc) {
  var text = "You have received a report from " + acc.email + ":\n\n";
  text += "The annoucement reported is " + acc.headline + ":\n\n";
  text += acc.description;
  text += "\n\nReport:\n'" + acc.report + "'.\n";
  return text;
}

EM.composeCancelEquipment = function(o)
{
  var text = "The following user has asked for cancellation of the following equipment:\n\nUser: " +
              o.user + "\n\nEquipment checkout cancelled:\n\n";
  for (var i = 0; i < o.size; i++) {

    text+=o.equipments[i].name + " ==> Category: " + o.equipments[i].category + "\n";
  }
  return text;
}
