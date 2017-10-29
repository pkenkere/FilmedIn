var path = require('path');

module.exports = function(app, db) {

	var controller = require(path.join(__dirname, '..', 'modules', 'job-controller'));

		//View all jobs
		app.get('/jobs', function(req, res) {
		controller.getAllJobs( function(err, jobs){
				if(!err){
					res.send(jobs);
				}
			})
		/*console.log(req.query.email);
		res.json({'status' : 'success'});*/
	});

	//Post a job
	app.post('/jobs', function(req, res) {
		//console.log(req.body,req.headers);
		/*if (req.session.user == null){
			res.redirect('/');
		}
		else {
			controller.addJob()
		}*/
		controller.addJob(req.body,
			function(e, o){
				if(e) {
					res.status(400).send('error-adding-job');
				}
				else {
					res.status(200).send('ok, job added');
				}
		});
		//res.json({'status' : 'success'});
	});

//Route to get specific jobs
	app.get('/jobs/search', function(req, res) {
		console.log(req.params,req.query);
		res.json({'status' : 'success'});
	});

	app.put('/jobs/:jobID', function(req, res) {
		console.log(req.params,req.query,req.body);
		res.json({'status' : 'success'});
	});
};
