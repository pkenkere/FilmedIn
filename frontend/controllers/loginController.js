"use strict";
var url = "http://localhost:5000";
function loginPost(email, password) {
  var loginCredentials = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
          pass: password
      })
  }
  fetch(url+"/", loginCredentials)
  .then(function(res){
      if(res.ok){
          res.json().then(function(data) {
            sessionStorage.setItem("email", email);            
            if (data.isAdmin == true)
                location.href = "../HTML/admin.html?user="+email;
            else            
                location.href = "../HTML/profile.html?user="+email;
          //   profileGet(email);
            console.log("login success!");
          });
          //login to profile
          
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
    var logoutMethod = {
        method: "POST",
    }
    fetch(url+"/logout", logoutMethod)
    .then(function(res){
        if(res.ok){
            sessionStorage.removeItem("email");
            console.log("successfully logged out!");
            location.href = "../HTML/index.html";
        }
        else{
            console.log("failed to log out");
        }
    })
    .catch(function(err){
        console.log("POST request failed", err);        
    });
}

// function profileGet(email){
//     var a = {
//         method: "GET",
//         headers:{
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(email)
//     }
//     fetch(url+"/profile", a)
//     .then(function(res){
        

//     })
// }