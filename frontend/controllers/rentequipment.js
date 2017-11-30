"use strict";
var url = "http://localhost:5000";
function rentEquipmentPost(arr, email, dateFrom, dateTo) {
  var equipdets = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          equipments : arr,
          email : email,
          dateFrom : dateFrom,
          dateTo : dateTo
      })
  }
  fetch(url+"/equipment/checkout", equipdets)
  .then(function(res){
      if(res.ok){
          //login to profile
          //displaySuccess();
          location.href = "../HTML/profile.html?email=" + email;
          console.log("request sent!");
      }
      else{
          //alert incorrect
          console.log("incorrect");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}

function getAllEquip(){
    var equip = {
        method : "GET"
    }
    fetch(url+"/equipments", equip)
    .then(function(res){
      if(res.ok) {
        res.json().then(function(data){
          for (var i = 0; i < data.length; i++) {
            var equip = data[i];
            var label= document.createElement("label");
            var description = document.createTextNode(equip.name);
            var checkbox = document.createElement("input");

            checkbox.type = "checkbox";    // make the element a checkbox
            checkbox.id = i;               // give it id
            checkbox.value = equip.name;   // make its value

            label.appendChild(checkbox);   // add the box to the element
            label.appendChild(description);// add the description to the element

            console.log("" + equip.category);

            // add the label element to your div
            document.getElementById("" + equip.category).appendChild(label);
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
