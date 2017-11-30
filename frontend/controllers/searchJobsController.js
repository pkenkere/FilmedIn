"use strict";
var url = "http://localhost:5000";
function searchPost(ext){
    var srch = {
        method: "GET"
    }
    fetch(url+ext, srch)
    .then(function(res){
      res.json().then(function(data) {
        //postSearchResults(data);
        //console.log(data);
        fillJobs(data);
      })
    })
    // else{
    //     //alert incorrect
    //     console.log("res.ok == false");
    // }
    // })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}

function jobApplyPost(temp){
    var obj = {
        method: "POST",
        headers: {
            'content-type': 'application/json'
       },
       body: JSON.stringify(temp)
    }

    fetch(url+"/jobs/apply", obj)
    .then(function(res){
        if(res.ok){
            console.log("applied!");
            location.href = "../HTML/profile.html";
        }
        else{
            console.log("failed");
        }
    })
    .catch(function(err){
        console.log("POST request failed", err);
    });
}
