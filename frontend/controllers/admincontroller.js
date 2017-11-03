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
          email: email,
          isAdmin: isAdmin
      })
  }
  fetch(url+"/updateProfile", AdminDetails)
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


// function getAllEquip(){
//   var equip= {
//     method: "GET"
//   }
//   fetch(url+"/equipment", equip)
//   .then(function(res){
//     if(res.ok){
//       res.json().then(function(data){
//         console.log(data);
//       })
//     })
//   }
//   else {
//     console.log("");
//   }
// }
