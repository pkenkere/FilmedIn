"use strict";
var url = "http://localhost:5000";
function profileGet(e){
    //console.log("email from the frontend: " + e);
    var profile = {
        method : "GET",
    };
    fetch(url+"/profile?email=" + e)
    .then(function(res){
        //console.log("object name: " + res);
        if(res.ok) {
             res.json().then(function(data){
                 //console.log("data name: " + data.name);

                 var nameDisplay = document.getElementById("proName");
                 if (data.name == null) {
                   nameDisplay.innerHTML = "";
                 }
                 else {
                   nameDisplay.innerHTML = data.name;
                 }

                 var major = document.getElementById("result");
                 if (data.major == null) {
                   major.innerHTML = "";
                 }
                 else {
                   major.innerHTML = "Major: " + data.major;
                 }

                 var year = document.getElementById("resultY");
                 if (data.year == null) {
                   year.innerHTML = "";
                 }
                 else {
                   year.innerHTML = "Year: " + data.year;
                 }

                 var interest = document.getElementById("resultI");
                 if (data.interest == null) {
                   interest.innerHTML = "";
                 }
                 else {
                   interest.innerHTML = "Interest: " + data.interest;
                 }

                 var ethnicity = document.getElementById("eth");
                 if (data.ethnicity == null) {
                   ethnicity.innerHTML = "";
                 }
                 else {
                   ethnicity.innerHTML = "Ethnicity: " + data.ethnicity;
                 }

                 var age = document.getElementById("age");
                 if (data.age == null) {
                   age.innerHTML = "";
                 }
                 else {
                   age.innerHTML = "Age: " + data.age;
                 }

                 var gender = document.getElementById("gender");
                 if (data.gender == null) {
                   gender.innerHTML = "";
                 }
                 else {
                   gender.innerHTML = "Gender: " + data.gender;
                 }

                 var linkedInLink = document.getElementById("linkedInLink");
                 if (data.linkedInLink == null) {
                  linkedInLink.innerHTML = "";
                 }
                 else {
                   linkedInLink.innerHTML = "Link: " + '<a href="' + data.linkedInLink+ '" target="_blank">' + data.linkedInLink + '</a>';
                 }
                 var facebookLink = document.getElementById("facebookLink");
                 if (data.facebookLink == null) {
                  facebookLink.innerHTML = "";
                 }
                 else {
                   facebookLink.innerHTML = "Link: " + '<a href="' + data.facebookLink+ '" target="_blank">' + data.facebookLink + '</a>';
                 }
                 var instagramLink = document.getElementById("instagramLink");
                 if (data.instagramLink == null) {
                  instagramLink.innerHTML = "";
                 }
                 else {
                   instagramLink.innerHTML = "Link: " + '<a href="' + data.instagramLink+ '" target="_blank">' + data.instagramLink + '</a>';
                 }
                 var resumeLink = document.getElementById("resumeLink");
                 if (data.resumeLink == null) {
                  resumeLink.innerHTML = "";
                 }
                 else {
                   resumeLink.innerHTML = "Link: " + '<a href="' + data.resumeLink+ '" target="_blank">' + data.resumeLink + '</a>';
                 }
             });
            //console.log("res: " + res);
        }
        else{
            location.href = "../HTML/404notfound.html";
        }
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}

function resumePost(r){
  var res = {
    method: "POST",
    headers:{
         'content-type': 'application/json'
    },
    body: {
         resume: r
    }
  }
  fetch(/*RESUME ROUTE*/)
  .then(function(res){

  })
  .catch(function(err){
      console.log("GET request failed", err);
  });
}

function profileUpdate(email, profile) {
  var profileData = {
    method : "POST",
    headers:{
        'content-type': 'application/json'
    },
    body: JSON.stringify(profile)
  };

    fetch(url + "/profile", profileData)
    .then(function(res) {
        if (res.ok) {
        res.json().then(function(data) {
          location.href = "../HTML/profile.html?email=" + data.email;
        });
      }
      else {
        location.href = "../HTML/404notfound.html";
      }
    });
}
