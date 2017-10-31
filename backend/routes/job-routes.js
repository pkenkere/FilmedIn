var path = require('path');

module.exports = function(app) {

	var controller = require(path.join(__dirname, '..', 'modules', 'job-controller'));

		//View all jobs
		app.get('/jobs', function(req, res) {
		controller.getAllJobs( function(err, jobs){
				if(!err){
					res.send(jobs);
				}
				else {
					res.send('error retrieving joblist')
				}
			})
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
		console.log(req.body);
		controller.addJob({
			prodDet : {
				title : req.body.prodDet.title,
				type : req.body.prodDet.type,
				desc : req.body.prodDet.desc,
				prodDates : req.body.prodDet.prodDates,
				expDate : req.body.prodDet.expDate,
				paid : req.body.paid
			},
			roles : {
				name : req.body.roles.name,
				roleType : req.body.roles.roleType,
				gender : req.body.roles.gender,
				age : req.body.roles.age,
				ethnicity : req.body.roles.ethnicity,
				roleDesc : req.body.roles.roleDesc
			},
			auditions : {
				specialInstr : req.body.auditions.specialInstr,
				audStartDate : req.body.auditions.audStartDate,
				audEndDate : req.body.auditions.audEndDate
			}
		}, function(e, o){
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
		// console.log(req.params,req.query);
		// res.json({'status' : 'success'});
		
	});


};
