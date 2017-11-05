function body_onload() {
  document.getElementById('PostJobBtn').onclick = postJob_onclick;
  document.getElementById('LogoutBtn').onclick = logout_onclick;
  document.getElementById('JobsBtn').onclick = opportunities_onclick;
  document.getElementById('btnSrch').onclick = btnSrch_onclick;
}

function postJob_onclick() {
  location.href = "Jobpost.html";
}

function logout_onclick() {
  localStorage.removeItem("loggedInId");
  location.href = "splash.html";
}

function opportunities_onclick() {
  location.href = "searchJobs.html";
}

function btnSrch_onclick(){
  var eth = document.getElementById("ethnicity").value;
  var age = parseInt(document.getElementById("range").innerHTML);
  var name = document.getElementById("name").value;
  var json = localStorage.getItem("infoProfiles");
  console.log(json);
  var allUsers = new Array();
  allUsers = JSON.parse(json);
  var filtered = new Array();
  filtered = allUsers;
  console.log(eth);
  console.log(allUsers);
  if (name !== null && name !== "") {
    for (var i = 0; i < filtered.length; i++) {
      if (!(filtered[i].name.contains(name))) {
          filtered.splice(i, 1);
          i--;
      }
    }
  }
  if (age != 0) {
    for (var i = 0; i < filtered.length; i++) {
      if (filtered[i].age !== age) {
          filtered.splice(i, 1);
          i--;
      }
    }
  }
  if (eth != null || eth != "") {
    for (var j = 0; j < filtered.length; j++) {
      if (filtered[j].ethnicity !== eth) {
          filtered.splice(j, 1);
          j--;
      }
    }
  }
  for (var i = 0; i < 3; i++) {
    if (testCheckbox("chck"+i)) {
      for (var i = 0; i < filtered.length; i++) {
        if (filtered[i].gender !== gender) {
            filtered.splice(i,1);
            i--;
        }
      }
    }
  }

  for (var i = 0; i < filtered.length; i++) {
    console.log(filtered[i]);
  }
}

function testCheckbox(oCheckbox) {
    var checkbox_val = oCheckbox.value;
    if (oCheckbox.checked == true){
        return true;
    }
    else{
      return false;
    }
}
