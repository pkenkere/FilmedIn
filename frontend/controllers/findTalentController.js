var url = "http://localhost:5000";
function talentPost(...) {
  var TalentFilters = {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      ...
    })
  }
  fetch(url+"/", TalentFilters)
  .then(function(res){
    if (res.ok) {
      res.json().then(function(data) {
        ...
      });
    }
    else {
      console.log("error");
    }
  })
  .catch(function(err){
     console.log("POST request failed", err);
  });
}
