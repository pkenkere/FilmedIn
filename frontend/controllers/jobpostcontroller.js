"use strict";
var url = "http://localhost:5000";
function jobPost(title, prodtype,prodDescrip, DateAndLoc, expDate, isPaid,spcl, start,end) {
  var productionCredentials = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
      title : title,
      type : prodType,
      desc : prodDescrip,
      prodDates : DateAndLoc,
      expDate : expDate,
      paid : isPaid,
      specialInstr : spcl,
      audStartDate : start,
      audEndDate : end
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
