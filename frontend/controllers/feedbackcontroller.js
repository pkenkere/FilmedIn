"use strict";
var url = "http://localhost:5000";
function feedbackPost(email, feedback) {
  var feedbackData = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
          feedback: feedback
      })
  }
  fetch(url+"/", feedbackData)
  .then(function(res){
      if(res.ok){
          res.json().then(function(data) {
            console.log("feedback sent!");
          });
          //login to profile
      }
      else{
          //alert incorrect
          console.log("incorrect posting");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}
