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

function addNewAdmin(email) {
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
          desc: description
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
            id: a
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
      fetch(url+"/announcementsall", announce)
      .then(function(res){
          if(res.ok){
             res.json().then(function(data) {
                //console.log(data);
                //  edata = data;
                fillDivAnnounce(data);
                console.log("res.ok == false");
          })
      }
      else {
        console.log("incorrect username/password");
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
              id: a
          })
        }
        fetch(url+"/announcements/delete", d)  /////no route made?????
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
  fetch(url+"/printFeedbacks", feed)
    .then(function(res){
      if(res.ok){
         res.json().then(function(data) {
           var categ = document.getElementById('seeFeedback');
           for (var i = 0; i < data.length; i++) {
              var feed = data[i];
              console.log("feedback email: " + feed.email);
              var child = document.createElement("div");
              child.innerHTML = '<div class=' + '"card"' + '><div class = ' + '"card-header"' + '><button type=' + '"button"' + ' id="' + feed._id + '" class=' + '"btn btn-info"' + '><span id = ' + '"crossBtn"' + ' class=' + '"glyphicon glyphicon-remove">' + '</button>' + '</div><div class='
               + '"card-block"' + ' id=' + '"card"' + '><h4 class=' + '"card-title"' + '>From: ' + feed.email + '</h4><p class=' + '"card-text"' + '>' + feed.feedback + '</p></div></div>';

              categ.appendChild(child);

              var btn = document.getElementById("" + feed._id);
              btn.onclick = removeFeedback;
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

function removeFeedback() {
  var d = {
      method: "POST",
      headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        id: this.id
    })
  }
  fetch(url+"/deleteFeedback", d)  /////no route made?????
  .then(function(res){
      if(res.ok){
        var categ = document.getElementById('seeFeedback');
        categ.innerHTML = "<strong>Here are the feedbacks from the users</strong>";
        getAllFeed();
      }
      else{
          console.log("delete failed");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  })
}

function getAllUsers() {
  var profileData= {
    method: "GET"
  }
  fetch(url+"/printUsers", profileData)
    .then(function(res){
      if(res.ok){
         res.json().then(function(data) {
          var categ = document.getElementById('RemoveUser');
           for (var i = 0; i < data.length; i++) {
              var profile = data[i];
              var child = document.createElement("div");
                child.innerHTML = '<div class=' + '"panel panel-default"' + '><h4 class=' + '"panel-heading"' + '>Name: ' + profile.name +'<span id = "' + profile._id + '"class=' + '"glyphicon glyphicon-remove"' + '></span></h4><h4 class='
                 + '"panel-body"' + '>' + 'Email: ' + profile.email + '</h4></div></div>';
              categ.appendChild(child);
              var btn = document.getElementById(profile._id);
              console.log(btn);
              btn.onclick = removeProfile;
            }
        })
      }
      else{
        //alert incorrect
        console.log("incorrect profileGet");
      }
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}

function removeProfile() {
  var reportData = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          id: this.id,
      })
  }
  fetch(url+'/delete', reportData)
  .then(function(res){
      if(res.ok){
          //reset password
          var categ = document.getElementById('RemoveUser');
          categ.innerHTML = "";
          getAllUsers();
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
