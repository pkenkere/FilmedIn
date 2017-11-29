"use strict";
var url = "http://localhost:5000";
function addEquipmentPost(name, category, available) {
  var equipmentDetails = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          category: category,
          available:available
      })
  }
  fetch(url+"/equipment", equipmentDetails)
  .then(function(res){
      if(res.ok){
          //login to profile
          displaySuccess();
          console.log("equipment added!");
      }
      else{
          //alert incorrect
          console.log("incorrect username/password");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}

function addNewAdmin(email, isAdmin) {
  var AdminDetails = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          email: email
      })
  }
  fetch(url+"/updateAdmin", AdminDetails)
  .then(function(res){
      if(res.ok){
          //login to profile
          displaySuccess();
          console.log("admin added!");
      }
      else{
          //alert incorrect
          console.log("invalid");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}

function addNewsPost(headline, description) {
  var newsDetails = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          headline: headline,
          description: description
      })
  }
  fetch(url+"/announcements", newsDetails)
  .then(function(res){
      if(res.ok){
          //login to profile
          displaySuccess();
          console.log("news added!");
      }
      else{
          //alert incorrect
          console.log("incorrect username/password");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}


function getAllEquip() {
  var equip = {
    method: "GET"
  }
  fetch(url+"/equipments", equip)
  .then(function(res){
      if(res.ok){
         res.json().then(function(data) {
            //console.log(data);
            //  edata = data;
            fillDiv(data);
        })
  }
      else{
          //alert incorrect
          console.log("res.ok == false");
      }
  })
  .catch(function(err){
      console.log("GET request failed", err);
  });
  }

  function deleteEquip(a){
      var d = {
          method: "POST",
          headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: a
        })
      }
      fetch(url+"/deleteEquipment", d)
      .then(function(res){
          if(res.ok){
              getAllEquip();
          }
          else{
              console.log("delete failed");
          }
      })
      .catch(function(err){
          console.log("POST request failed", err);
      })
  }

function getAllAnnounce() {
    var announce = {
      method: "GET"
    }
    fetch(url+"/announcements", announce)
    .then(function(res){
        if(res.ok){
           res.json().then(function(data) {
              //console.log(data);
              //  edata = data;
              fillDivAnnounce(data);
            console.log("res.ok == false");
        }
    })
    .catch(function(err){
        console.log("POST request failed", err);
    });
    }

function deleteAnnounce(a){
        var d = {
            method: "POST",
            headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              name: a
          })
        }
        fetch(url+"/deleteAnnouncement", d)  /////no route made?????
        .then(function(res){
            if(res.ok){
                getAllAnnounce();
            }
            else{
                console.log("delete failed");
            }
        })
        .catch(function(err){
            console.log("POST request failed", err);
        })
    }

function getAllFeed() {
  var feed = {
    method: "GET"
  }
  fetch(url+"/getAllFeedbacks", feed)
    .then(function(res){
      if(res.ok){
         res.json().then(function(data) {
           for (var i = 0; i < data.length; i++) {
              var feed = data[i];
              var some = document.createElement("div");
              // some.setAttribute("type","...");
              some.innerHTML = feed.feedback;
              // some.setAttribute("value", feed.feedback);
              some.setAttribute("id", feed.email);
              var categ = document.getElementById('seeFeedback');
              categ.appendChild(some);
            }
        })
      }
      else{
        //alert incorrect
        console.log("incorrect username/password");
      }
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}
