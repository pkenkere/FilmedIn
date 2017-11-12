"use strict";
var url = "http://localhost:5000";
function rentEquipmentPost(name, category) {
  var equipdets = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          category: category
      })
  }
  fetch(url+"...", equipdets)
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
