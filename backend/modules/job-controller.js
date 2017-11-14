var getObjectId = function(id)
{
    return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
    jobs.findOne({_id: getObjectId(id)},
            function(e, res) {
                if (e) callback(e)
                else callback(null, res)
            });
}

var jobs;
exports.init = function(db){
  jobs = db.collection('jobs');
}

exports.getAllJobs = function(callback)
{
    jobs.find().toArray(
            function(e, res) {
                if (e) callback(e)
                else callback(null, res)
            });
}

exports.delAllJobs = function(callback)
{
    jobs.remove({}, callback); // reset job list for testing //
}

exports.addJob = function (jobData,callback)
{
  jobData.dateCreated = moment().format('MMMM Do YYYY, h:mm:ss');
    jobs.save(jobData,function(e) {
      if(e) callback(e);
      else callback(null, jobData);
    });
}

exports.search = function (criterias, callback) {
  jobs.find(criterias).toArray(
    function(e, res) {
      if (e)
        callback(e);
      else {
        callback(null, res);
      }
    }
  );
}

exports.deleteJob = function(id, callback)
{
  findById(id, function(e,o){
    if(e || o == null) callback(1);
    else {
      jobs.remove({_id: getObjectId(id)}, function(e,o){
        if(e) callback(e);
        else callback(null, o);
      });
    }
  });
}
