"use strict";
var url = "localhost:5000";
var loginCredentials = {
    method: "POST",
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        user: loginEmail.value,
        pass: passLogin.value
    })
}
fetch(url+"/", loginCredentials)
.then(function(res){
    if(res.ok){
        //login to profile
        console.log("login success!");
    }
    else{
        //alert incorrect
        console.log("incorrect username/password");
    }
})
.catch(function(err){
    console.log("POST request failed", err);
});