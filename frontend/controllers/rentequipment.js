"use strict";
var url = "http://localhost:5000";
function rentEquipmentPost(arr, email) {
  var equipdets = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          arr: arr,
          email: email
      })
  }
  fetch(url+"/equipment", equipdets)
  .then(function(res){
      if(res.ok){
          //login to profile
          displaySuccess();
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
        res.json().then(function(data){
          for (var i = 0; i < data.length; i++) {
            var equip = data[i];
            var some = document.createElement("input");
            some.setAttribute("type", "checkbox");
            some.setAttribute("value", equip.name);
            some.setAttribute("id", equip.category);
            some.innerHTML = equip.name;
            var categ = document.getElementById(equip.category);
            categ.appendChild(some);
          }
            console.log(data);
            //var json = JSON.parse(data);
            //console.log(json);
            console.log(data[0].name);
        })
    })
    .catch(function(err){
        console.log("GET request failed", err);
    });
}
