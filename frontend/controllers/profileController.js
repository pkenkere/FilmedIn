"use strict";
var url = "http://localhost:5000";
function profileGet(){
    var profile = {
        method: "GET"
    }
    fetch(url+"/profile", profile)
    .then(function(res){
        if(res.ok){

        }
        else{

        }
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}