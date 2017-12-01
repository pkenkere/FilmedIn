"use strict";
var url = "http://localhost:5000";
function talentGet(ext) {
  var TalentFilters = {
    method: "GET"
  }
  fetch(url+ext, TalentFilters)
  .then(function(res){
    if (res.ok) {
      res.json().then(function(data) {
        console.log(data);
        fillTalent(data);
      });
    }
    else {
      console.log("failed to get the profiles");
    }
  })
  .catch(function(err){
     console.log("GET request failed", err);
  });
}
