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

function reportInappropriate(email,annid, title, text) {
  var reportData = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
        announcementID: annid,
        title: title,
        description:text
      })
  }
  fetch(url+'/report', reportData)
  .then(function(res){
      if(res.ok){
          //reset password
          location.href = "../HTML/profile.html";
          console.log("reporting done");
      }
      else{
          //alert incorrect
          console.log("incorrect report");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}
