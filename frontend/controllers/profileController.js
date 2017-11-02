"use strict";
var url = "http://localhost:5000";
function profileGet(){
    var profile = {
        method: "GET"
    }
    fetch(url+"/profile", profile)
    .then(function(res){
        if(res){
            //var profileDet = JSON.parse(res);
            console.log(res);
        }
        else{
            console.log("no profile found");
        }
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}