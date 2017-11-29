"use strict";
var url = "http://localhost:5000";
function sendEmail(email) {
var resetPasswordData = {
    method: "POST",
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
    })
}
fetch(url+"/lost-password", resetPasswordData)
.then(function(res){
    if(res.ok){
        //reset password
        console.log("Email Sent");
    }
    else{
        //alert incorrect
        console.log("incorrect email");
    }
})
.catch(function(err){
    console.log("POST request failed", err);
});
}
