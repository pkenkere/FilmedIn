"use strict";
var url = "http://localhost:5000";
function profileGet(e){
    console.log("email: " + e);
    var profile = {
        method: "GET",
        // headers:{
        //      'content-type': 'application-json'
        // },
        // body: {
        //      email: e
        // }
    }
    fetch(url+"/profile", profile)
    .then(function(res){
        // console.log("idhar pohcha bhenchod!!!");
        // console.log("res.ok: " + res.ok);
        // console.log("object name: " + res);  
        if(res.ok){
            //var profileDet = JSON.parse(res);
            // res.json().then(function(data){
            //     console.log(data);
            // });
            console.log("res: " + JSON.parse(res));
        }
        else{
            console.log("no profile found");
        }
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}