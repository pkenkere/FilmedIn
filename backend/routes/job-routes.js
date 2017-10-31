var path = require('path');

module.exports = function(app) {

	var controller = require(path.join(__dirname, '..', 'modules', 'job-controller'));

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
			prodDet : {
				title : req.body.prodDet.title,
				type : req.body.prodDet.type,
				desc : req.body.prodDet.desc,
				prodDates : req.body.prodDet.prodDates,
				expDate : req.body.prodDet.expDate,
				paid : req.body.prodDet.paid
			}
		};
		job.roles = req.body.roles;
		job.auditions = {
			specialInstr : req.body.auditions.specialInstr,
			audStartDate : req.body.auditions.audStartDate,
			audEndDate : req.body.auditions.audEndDate
		};
		controller.addJob(job, function(e, o){
				if(e) {
					res.status(400).send('error-adding-job');
				}
				else {
					res.status(200).send('ok, job added');
				}
		});
	});

//Route to get specific jobs
	app.get('/jobs/search', function(req, res) {
		var criterias = {};
		if(req.query.ethnicity != null) criterias.ethnicity = req.query.ethnicity;
		if(req.query.gender != undefined) criterias.gender = req.query.gender;
		if(req.query.prodType != null) criterias.prodType = req.query.prodType;
		if(req.query.roleType != null) criterias.roleType = req.query.roleType;
		if(req.query.minAge != null) criterias.minAge = req.query.minAge;
		if(req.query.maxAge != null) criterias.maxAge = req.query.maxAge;
		console.log(criterias);

		controller.searchByGender(req.query.gender, function(err, jobs){
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
			res.redirect('/jobs')
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
};
