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
      type : prodType,
      desc : prodDescrip,
      prodDates : DateAndLoc,
      expDate : expDate,
      paid : isPaid,
      specialInstr : spcl,
      audStartDate : start,
      audEndDate : end,
      rolesArray: arr
      })
  }
  fetch(url+"/", productionCredentials)
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
