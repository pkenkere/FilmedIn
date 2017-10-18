function body_onload(){
  btnSrch.onclick = btnSrch_onclick;
}
function enable(){
  document.getElementById("btnSrch").disabled = false;
}

function btnSrch_onclick(){
  var eth = document.getElementById("ethnicity").value;
  var age = parseInt(document.getElementById("range").innerHTML);
  var name = document.getElementById("name").value;
  var json = localStorage.getItem("infoProfiles");
  var allUsers = JSON.parse(json);
  var filtered = new Array;
  filtered = allUsers;
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
