"use strict";
var url = "http://localhost:5000";
function jobPost(email, title, prodtype, prodDescrip, DateAndLoc, expDate, isPaid, spcl, start, end, arr) {
  var productionCredentials = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
      email: email,
      title : title,
      type : prodtype,
      desc : prodDescrip,
      prodDates : DateAndLoc,
      expDate : expDate,
      paid : isPaid,
      specialInstr : spcl,
      audStartDate : start,
      audEndDate : end,
      roles: arr
      })
  }
  console.log("inside job controller");
  fetch(url+"/jobs", productionCredentials)
  .then(function(res){
      if(res.ok){
          res.json().then(function(data) {
            displaySuccess();
            console.log("login success!");
          });
          //login to profile

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

function getAllJobs(){
    var job = {
        method : "GET"
    }
    fetch(url+"/jobs", job)
    .then(function(res){
      if(res.ok) {
        res.json().then(function(data){
          for (var i = 0; i < data.length; i++) {
            var equip = data[i];
            var label= document.createElement("label");
            var description = document.createTextNode(equip.name);
            var checkbox = document.createElement("input");

            checkbox.type = "checkbox";    // make the element a checkbox
            checkbox.id = i;      // give it id
            checkbox.value = equip.name;         // make its value

            label.appendChild(checkbox);   // add the box to the element
            label.appendChild(description);// add the description to the element

            // add the label element to your div
            document.getElementById(equip.category).appendChild(label);
          }
            //console.log(data);
            //var json = JSON.parse(data);
            //console.log(json);
            //console.log(data[0].name);
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
