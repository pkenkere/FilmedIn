function body_onload() {
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
}


var count = 0;


function updateR(divName) {
  var rolename = $('#rolename').val() == '' ? '---' : $('#rolename').val();

  var rI = document.getElementById('RoleTypes');
  var roletype= rI.options[rI.selectedIndex].value;

  var gender = document.querySelector('input[name="gender"]:checked').value;

  var age = document.getElementById("range").value;

  var eI= document.getElementById('ethnicity');
  var ethnicity = eI.options[eI.selectedIndex].value;

  var roledesc = $('#roledesc').val() == '' ? '---' : $('#roledesc').val();

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
  location.href = "../HTML/Jobpost.html";
}

function rentBtn_onclick(){
  location.href = "../HTML/rentequip.html";
}

function logout_onclick() {
  localStorage.removeItem("loggedInId");
  location.href = "../HTML/index.html";
}
