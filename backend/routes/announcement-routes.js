var path = require('path');

module.exports = function(app) {
	var controller = require(path.join(__dirname, '..', 'modules', 'announcement-controller'));
    app.get('/announcements', function(req, res) {
		//console.log(req.params,req.que);
    controller.getAllAnnouncements(function(err, announcements){
      if(!err){
        res.send(announcements);
      }
    });
		//res.json({'status' : 'success'});
	});

	app.post('/announcements', function(req, res) {
		//console.log(req.body,req.headers);
    controller.addAnnouncement(req.body, function(err,o) {
      if(err) res.status(400).send("error-adding-annoucement");
      else {
        res.status(200).send('ok, announcement added');
      }
    });
		//res.json({'status' : 'success'});
	});

	/*app.get('/announcements/:announcementID', function(req, res) {
		console.log(req.params,req.query);
		res.json({'status' : 'success'});
	});

	app.put('/announcements/:announcementID', function(req, res) {
		console.log(req.params,req.query,req.body);
		res.json({'status' : 'success'});
	});*/
};
