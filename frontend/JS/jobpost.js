function body_onload() {
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  jobPostBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
}
var count = 0;
var arr = new Array();
function updateR(divName) {
  var rolename = $('#rolename').val() == '' ? '---' : $('#rolename').val();

  var rI = document.getElementById('RoleTypes');
  var roletype= rI.options[rI.selectedIndex].value;

  var gender = document.querySelector('input[name="gender"]:checked').value;

  var age = document.getElementById("slider").value;

  var eI= document.getElementById('ethnicity');
  var ethnicity = eI.options[eI.selectedIndex].value;

  var roledesc = $('#roledesc').val() == '' ? '---' : $('#roledesc').val();

  var obj = {
    name: rolename,
    type: roletype,
    gender: gender,
    age: age,
    ethnicity: ethnicity,
    description: roledesc
  };

  arr.push(obj);

  var newdiv = document.createElement('div');
    newdiv.innerHTML = '<div class="panel panel-default">' +
      '<div class="panel-heading">' +
      '<h4 class="panel-title">' +
      '<a data-toggle="collapse" data-parent="#role-accordion" href="#col' + (count) + '"> ' + rolename + '</a></h4>' +
      '</div>' +
      '<div id="col' + (count) + '" class="panel-collapse collapse">' +
      '<div class="panel-body">' +
      '<div>Role Name: ' + rolename + '</div>' +
      '<div>Role Type: ' + roletype + '</div>' +
      '<div>Role Gender: ' + gender + '</div>' +
      '<div>Role Age: ' + age + '</div>' +
      '<div>Role Ethnicity: ' + ethnicity + '</div>' +
      '<div>Role Description: ' + roledesc + '</div>' +
      '</div>' +
      '</div></div></br>';
    document.getElementById(divName).appendChild(newdiv);
    count++;
}

function HomeBtn_onclick(){
  location.href = "../HTML/newsfeed.html";
}

function JobsBtn_onclick(){
  location.href = "../HTML/searchJobs.html";
}

function ProfBtn_onclick(){
  location.href = "../HTML/findTalent.html";
}

function PostJobBtn_onclick(){
  console.log("job post button clicked");
  // prodtype = document.querySelector('input[name="prodTypes"]:checked').value;
  var e = document.getElementById("productionTypes");
  var prodtype = e.options[e.selectedIndex].value;
  var title = document.getElementById("title").value;
  var prodDescrip = document.getElementById("desc").value;
  var DateAndLoc = document.getElementById("datLoc").value;
  var expDate = document.getElementById("exp").value;
  var checks = document.getElementsByClassName("paid");
  var isPaid;
  for(var i=0; checks[i]; ++i) {
    if (checks[i].checked === true) {
      isPaid = checks[i].value;
      break;
    }
  }
  var spcl = document.getElementById("spcl").value;
  var start = document.getElementById("startAud").value;
  var end = document.getElementById("endAud").value;
  var email = sessionStorage.getItem("email");

  jobPost(email, title, prodtype, prodDescrip, DateAndLoc, expDate, isPaid, spcl, start, end, arr);
}

function displaySuccess() {
  SuccessAlert.style.display = "block";
}

function rentBtn_onclick(){
  location.href = "../HTML/rentequip.html";
}

function logout_onclick() {
  localStorage.removeItem("loggedInId");
  location.href = "../HTML/index.html";
}
