"use strict";
var entries;
var url = "http://localhost:5000";
function getAllAnnounce() {
  entries = new Array();
    var announce = {
      method: "GET"
    }
    fetch(url+"/announcementsall", announce)
    .then(function(res){
        if(res.ok){
           res.json().then(function(data) {
             entries = data;
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
