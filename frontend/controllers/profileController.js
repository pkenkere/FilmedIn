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
                 console.log(linkedInLink);
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

function equipmentGet(e) {
  var profile = {
      method : "GET",
  };
  fetch(url+"/profile?email=" + e)
  .then(function(res){
    if(res.ok) {
         res.json().then(function(data){
          var equipList = document.getElementById('equipList');

          if (data.equipments.length == 0) {
            var child = document.createElement("div");
            //child.id = "";
            child.innerHTML = "No equipments rented currently";
            equipList.appendChild(child);
          }
          else {
            for (var i = 0; i < data.equipments.length; i++) {
              var child = document.createElement("div");
              child.id = "Equip";
              child.innerHTML = "Name: " + data.equipments[i].name + "\nCategory: " + data.equipments[i].category;
              equipList.appendChild(child);
            }
          }
        });
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

function getAllJobs(){
    var job = {
        method : "GET"
    }
    fetch(url+"/jobs", job)
    .then(function(res){
      if(res.ok) {
        res.json().then(function(data){
          var count = 0;
          var email = sessionStorage.getItem("email");
          for(var i = 0; data.length; i++) {
            if (email === data[i].email) {
              var newdiv = document.createElement('div');
                newdiv.innerHTML = '<div class="panel panel-default">' +
                  '<div class="panel-heading">' +
                  '<h4 class="panel-title">' +
                  '<a data-toggle="collapse" data-parent="#job-accordion" href="#col' + (count) + '"> ' + data[i].title + '</a></h4>' +
                  '</div>' +
                  '<div id="col' + (count) + '" class="panel-collapse collapse">' +
                   '<div id="interested" class="panel-body">' +
                   // '<div>Role Name: Hello</div>' +
                   // '<div>Role Type: hello</div>' +
                   // '<div>Role Gender: 12</div>' +
                   // '<div>Role Age: 1231</div>' +
                   // '<div>Role Ethnicity: asdsgafg</div>' +
                   // '<div>Role Description: sdafasdfasdfasdfasdf</div>' +
                  '</div>' +
                  '</div></div></br>';
                for(var j = 0; j < data[i].applicants.length; j++) {
                   var divA = document.createElement('div');
                   divA.innerHTML = '<div>Applicant: ' + data[i].applicants[j].name + '</div>';
                   //divA.innerHTML = "Applicant: " + '<a href="' + data[i].applicants[j].name + '" target="_blank">' + data[i].applicants[j].name + '</a>';
                   document.getElementById("interested").appendChild(divA);
                }
                document.getElementById("showJobsID").appendChild(newdiv);
                count++;
            }
          }
        })
      }
      else {
        console.log("incorrect username/password");
      }
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}

function cancelReservation(email, equipments) {
  var equipmentData = {
    method : "POST",
    headers:{
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        equipments: equipments
      })
  }
    fetch(url + '/cancelEquipment', equipmentData)
    .then(function(res) {
      if(res.ok){
        console.log("cancellation sent!");
        location.href = "../HTML/profile.html?email=" + email;
      }
      else{
          //alert incorrect
          console.log("incorrect posting");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}
