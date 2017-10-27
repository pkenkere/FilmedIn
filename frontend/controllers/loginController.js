"use strict";
var url = "http://localhost:5000";
function loginPost(email, password) {
  var loginCredentials = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          user: email,
          pass: password
      })
  }
  fetch(url+"/", loginCredentials)
  .then(function(res){
      if(res.ok){
          //login to profile
          location.href = "profile.html?user="+email;
          console.log("login success!");
      }
      else{
          //alert incorrect
          incorrectCredentials();
          console.log("incorrect username/password");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}

function logoutPost(){
    fetch(url+"/logout")
    .then(function(res){
        if(res.ok){
            console.log("successfully logged out!");
            location.href = "index.html";
        }
        else{
            console.log("failed to log out");
        }
    })
    .catch(function(err){
        console.log("POST request failed", err);        
    });
}
