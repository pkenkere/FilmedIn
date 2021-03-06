var path = require('path');

var controller = require(path.join(__dirname, '..', 'modules', 'job-controller'));
var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));

//Initialize the database

module.exports = function(app,db) {
		controller.init(db);

		//View all jobs
		app.get('/jobs', function(req, res) {
		controller.getAllJobs( function(err, jobs){
				if(!err){
					//console.log(jobs[jobs.length - 1].roles[0].gender);
					res.send(jobs);
				}
				else {
					res.send('error retrieving joblist')
				}
			});
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
		var job = {
				email : req.body.email,
				title : req.body.title,
				type : req.body.type,
				desc : req.body.desc,
				prodDates : req.body.prodDates,
				expDate : req.body.expDate,
				paid : req.body.paid,
				specialInstr : req.body.specialInstr,
				audStartDate : req.body.audStartDate,
				audEndDate : req.body.audEndDate,
				applicants : [],
				roles : req.body.roles
		};
		controller.addJob(job, function(e, o){
				if(e) {
					console.log("error");
					res.status(400).send('error-adding-job');
				}
				else {
					//res.status(200).send('ok, job added');
					var newData = {
						jobPosted : job
					};
					PM.updateProfile(req.body.email,newData,
						function (e, o) {
							if (e) {
								console.log("error updating job");
								res.status(400).send('error updating job to account');
							}
							else {
								console.log('new job added');
								res.status(200).send(o);
							}
						});
				}
		});
	});

//Route to get specific jobs
	app.get('/jobs/search', function(req, res) {
		var criterias = {};
		if(req.query.ethnicity != null) criterias["roles.ethnicity"] = req.query.ethnicity;
		if(req.query.gender != null) criterias["roles.gender"] = req.query.gender;
		if(req.query.type != null) criterias.type = req.query.type;
		if(req.query.roleType != null) criterias["roles.type"] = req.query.roleType;
		if(req.query.minAge != null){
			criterias["roles.age"] = criterias["roles.age"] || {};
			criterias["roles.age"]["$gte"] = req.query.minAge;
		}
		if(req.query.maxAge != null){
			criterias["roles.age"] = criterias["roles.age"] || {};
			criterias["roles.age"]["$lte"] = req.query.maxAge;
		}
		//console.log(criterias);

		controller.search(criterias, function(err, jobs){
				if(!err){
					//console.log(jobs[jobs.length - 1].roles[0].gender);
					res.send(jobs);
				}
				else {
					res.send('error retrieving joblist')
				}
			});
	});

	//Route to delete all jobs for testing
	app.post('/jobs/deleteall', function(req, res) {
		controller.delAllJobs(function(){
			res.status(200).send('ok');
		});
	});

	//Delete specific jobs
	app.post('/jobs/delete', function (req, res) {
		controller.deleteJob(req.body.id, function(err, o){
			if(!err){
				res.status(200).send('job-deleted');
			}
			else{
				res.status(400).send('job not found');
			}
		});
	});

	app.post('/jobs/apply', function(req, res) {
		var data = {
			id : req.body.id,
			userEmail : req.body.userEmail,
			role : req.body.role
		};
		controller.saveApplicant(data, function(err, o){
			if(!err){
				res.status(200).send('applicant added');
			}
			else{
				res.status(400).send('could not add applicant');
			}
		});
	});
};
