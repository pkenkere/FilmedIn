"use strict";
var url = "http://localhost:5000";
function getAllAnnounce() {
    var announce = {
      method: "GET"
    }
    fetch(url+"/announcementsall", announce)
    .then(function(res){
        if(res.ok){
           res.json().then(function(data) {
             displayEntries(data);
          })
    }
        else{
            //alert incorrect
            console.log("res.ok == false");
        }
    })
    .catch(function(err){
        console.log("POST request failed", err);
    });
  }
