"use strict";
var url = "http://localhost:5000";
// function getAllAnnounce() {
//     var announce = {
//       method: "GET"
//     }
//     fetch(url+"/announcementsall", announce)
//     .then(function(res){
//         if(res.ok){
//            res.json().then(function(data) {
//              displayEntries(data);
//           })
//     }
//         else{
//             //alert incorrect
//             console.log("res.ok == false");
//         }
//     })
//     .catch(function(err){
//         console.log("POST request failed", err);
//     });
//   }

  function getAllAnnounce() {
      var announce = {
        method: "GET"
      }
      fetch(url+"/announcementsall", announce)
      .then(function(res){
          if(res.ok){
             res.json().then(function(data) {
               for(var i = 0; i < data.length;i++) {
                 var temp = document.createElement("div");
                 temp.id = "divid"
                 var j = data[i]._id;
                 temp.innerHTML = '<div class='+ '"card"' +'><div class = ' + '"card-header"' + '><button type=' + '"button"' + ' id="' + j + '" class=' + '"btn btn-info"' + '><span class=' + '"glyphicon glyphicon-thumbs-down"' + '></span>Report</button>' + '</div><div class=' + '"card-block"' + ' id=' + '"card"'
                  + '><h4 class=' + '"card-title">' + data[i].headline + '</h4><p class=' + '"card-text"' + '>' + data[i].desc+ '</p></div></div>';
              //   var buttonR = document.createElement("div");
                // buttonR.innerHTML = '<button type="button" id="' + j + '" class="btn btn-info"><span class="glyphicon glyphicon-thumbs-down"></span>Report</button>'
                 var parent = document.getElementById('printAll');
                 parent.append(temp);
                 //parent.appendChild(buttonR);
                 var btn = document.getElementById("" + j);
                  btn.onclick = openmodal;
                  btn.style.float = "right";
               }
            })
      }
          else {
              //alert incorrect
              console.log("res.ok == false");
          }
      })
      .catch(function(err){
          console.log("POST request failed", err);
      });
    }

function reportInappropriate(email,annid, title, text) {
  var reportData = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
        AnnID: annid,
        title: title,
        description:text
      })
  }
  fetch(url+'/report', reportData)
  .then(function(res){
      if(res.ok){
          //reset password
          location.href = "../HTML/profile.html";
          console.log("reporting done");
      }
      else{
          //alert incorrect
          console.log("incorrect report");
      }
  })
  .catch(function(err){
      console.log("POST request failed", err);
  });
}
