"use strict";
var url = "http://localhost:5000";
function resetPW(user,pass) {
  var resetPasswordData = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          email: user,
          pass: pass
      })
  }
  fetch(url+"/reset-password", resetPasswordData)
  .then(function(res){
      if(res.ok){
          //reset password
          location.href = "../HTML/index.html";
          console.log("password reset done");
      }
      else{
          //alert incorrect
          console.log("incorrect email/password");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}
