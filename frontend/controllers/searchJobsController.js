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
        console.log(data);
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
