"use strict";
var url = "http://localhost:5000";
function searchJ(ext){
    var srch = {
        method: "GET"
    }
    fetch(url+ext, srch)
    .then(function(res){
        
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}