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
  fetch(url+"/feedback", feedbackData)
  .then(function(res){
      if(res.ok){
          document.getElementById("YESBtn").style.backgroundColor = "white";
          document.getElementById("NOBtn").style.backgroundColor = "white";
          document.getElementById("PARTIALLYBtn").style.backgroundColor = "white";
          document.getElementById("optionalQ").style.display = "none";
            document.getElementById("feedForm").reset();
            displaySuccess();
            console.log("feedback sent!");
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
