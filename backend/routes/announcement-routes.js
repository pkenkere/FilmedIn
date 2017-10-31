var path = require('path');

module.exports = function(app) {
	var controller = require(path.join(__dirname, '..', 'modules', 'announcement-controller'));
    app.get('/announcements', function(req, res) {
    controller.getAllAnnouncements(function(err, announcements){
      if(!err){
        res.send(announcements);
      }
    });
	});

	app.post('/announcements', function(req, res) {
    controller.addAnnouncement({
			headline : req.body.headline,
			desc : req.body.desc
		}, function(err,o) {
      if(err) res.status(400).send("error-adding-annoucement");
      else {
        res.status(200).send('ok, announcement added');
      }
    });
	});

	app.post('/announcements/delete', function(req, res) {
		controller.delAllAnnouncements(function(){
			res.redirect('/announcements');
		});
	});

};
