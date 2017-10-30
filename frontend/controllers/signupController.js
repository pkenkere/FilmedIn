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
            //user: "N/A "+a.Name,
            pass: a.Password
        })
    }
    fetch(url+"/signup", signupInfo)
    .then(function(res){
        if(res.ok){
            console.log("signed up!");
            location.href = "permInfo.html?user="+a.Email;
        }
        else{
            console.log("signup failed");
        }
    })
    .catch(function(err){
        console.log("POST request failed", err);        
    });
}


function permInfo(info){
    var a = location.href;
    var user = a.split('?');
    var el = user[1].split('=');
    var additionalInfo = {
        method: "POST",
        headers :{
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email: el[1],
            age: info.Age,
            gender: info.Gender,
            ethnicity:info.Ethnicity
        })
    }
    fetch(url+"/profile", additionalInfo)
    .then(function(res){
        if(res.ok){
            window.alert(el[1]);
            window.alert(info.Age);
            window.alert(info.Gender);
            window.alert(info.Ethnicity);
            console.log("Saved additional info to the database!");
            location.href = "profile.html?user="+el[1];
        }
        else{
            console.log("Failed to store the information provided");
        }
    })
    .catch(function(err){
        console.log("POST request failed", err);
    });
}