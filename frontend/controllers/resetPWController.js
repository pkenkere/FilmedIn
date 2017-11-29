"use strict";
var url = "localhost:5000";
function resetPW(user,pass) {
var resetPasswordData = {
    method: "POST",
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        user: loginEmail.value,
        pass: passLogin.value
    })
}
fetch(url+"/reset-password", resetPasswordData)
.then(function(res){
    if(res.ok){
        //reset password
        location.href = "index.html?user="+loginEmail.value;
        console.log("password reset");
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
