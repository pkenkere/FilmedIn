var path = require('path');

var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));

PM.init(db);

module.exports = function(app, db) {
  app.post('/report', function(req, res) {
    
  });
};
