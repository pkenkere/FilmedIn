var infoAccounts = new Array();

function body_onload() {
  //accounts = new Array();
  getProfileInfo();
  document.getElementById('submitInfo').onclick = submitInfo_onclick;
}

function submitInfo_onclick() {
  var age = document.getElementById('age').value;
  var eI= document.getElementById('ethnicity');
  var ethnicity = eI.options[eI.selectedIndex].value;
  var gI = document.getElementById('gender');
  var gender = gI.options[gI.selectedIndex].value;
  if (age == null || ethnicity == null || gender == null) {
    alert("Please enter all information");
    return;
  }
  if (age == "" || ethnicity == "" || gender == "") {
    alert("Please enter all information");
    return;
  }
  var infoAccount = {
    Age : age,
    Ethnicity : ethnicity,
    Gender : gender
  };

  infoAccounts.push(infoAccount);
  saveProfileInfo();
  location.href = "profile.html";
}

function saveProfileInfo() {
  var json = JSON.stringify(infoAccounts);
  localStorage.setItem("infoProfiles", json);
}

function getProfileInfo() {
  infoAccounts = new Array();
  var json = localStorage.getItem("infoProfiles");
  if (json == null)
    return;

  infoAccounts = JSON.parse(json);
}
