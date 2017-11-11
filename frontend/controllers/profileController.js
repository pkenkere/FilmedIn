"use strict";
var url = "http://localhost:5000";
function profileGet(e){
    //console.log("email from the frontend: " + e);
    var profile = {
        method : "GET",
    };
    fetch(url+"/profile?email=" + e)
    .then(function(res){
        console.log("object name: " + res);
        if(res.ok){
             res.json().then(function(data){
                 console.log("data name: " + data.name);

                 var nameDisplay = document.getElementById("proName");
                 nameDisplay.innerHTML = data.name;
             });
            console.log("res: " + res);
        }
        else{
            console.log("no profile found");
        }
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}

function profileUpdate(email, profile) {
  var profileData = {
    method : "POST",
    headers:{
        'content-type': 'application/json'
    },
    body: JSON.stringify(profile)
  };

  fetch(url + "/profile", profileData)
    .then(function(res) {

    })
}
