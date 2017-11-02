"use strict";
var url = "http://localhost:5000";
function addNewEquipment(name, category, available) {
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
          equipmentAdded();
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
