"use strict";
var url = "http://localhost:5000";
function signupPost(acc){
    var a = JSON.parse(acc);
    var signupInfo = {
        method: "POST",
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify({
            name: a.Name,
            email: a.Email,
            user: "N/A",
            pass: a.Password
        })
    }

    fetch(url+"/signup", signupInfo)
    .then(function(res){
        if(res.ok){
            console.log("signed up!");
            location.href = "profile.html?user="+a.Email;
        }
        else{
            console.log("signup failed");
        }
    })
    .catch(function(err){
        console.log("POST request failed", err);        
    });
}