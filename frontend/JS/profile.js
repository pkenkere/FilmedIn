var count = 0;

function body_onload() {
  // getAccounts();
  // var id = parseInt(localStorage.getItem("loggedInId"));
  // var account = accounts[id];
  // var fname = account.FirstName;
  // var lname = account.LastName;
  // $('#proName').html(fname + " " + lname);
  // document.getElementById('PostJobBtn').onclick = postJob_onclick;
  // document.getElementById('LogoutBtn').onclick = logout_onclick;
  //   document.getElementById('ProfBtn').onclick = findTalent_onclick;
  //     document.getElementById('JobsBtn').onclick = opportunities_onclick;
  renderProfile();
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentEquipment_onclick;
}

function renderProfile(){
  var e = sessionStorage.getItem("email");
  profileGet(e);
  
}

//create body onload
//getAccounts
// get item from localStorage of with Key = "loggedInId"
// get info id
function postJob_onclick() {
 // location.href = "Jobpost.html";
  location.href = "admin.html"
}
function opportunities_onclick() {
  location.href = "searchJobs.html";
}

function findTalent_onclick() {
  location.href = "findTalent.html";
}

function logout_onclick() {
  localStorage.removeItem("loggedInId");
  location.href = "../HTML/index.html";
}

function rentEquipment_onclick(){
  location.href = "";
}

function updateJ(divName) {
  var major = $('#userMajor').val() == '' ? '---' : $('#userMajor').val();
  $('#result').html("Major: " + major);
  var year = $('#userYear').val() == '' ? '---' : $('#userYear').val();
  $('#resultY').html("Year: " + year);
  var interest = $('#userInterests').val() == '' ? '---' : $('#userInterests').val();
  $('#resultI').html("Interests: " + interest);
  var jobN = $('#userJobN').val() == '' ? '---' : $('#userJobN').val();
  var jobD = $('#userJobD').val() == '' ? '---' : $('#userJobD').val();
    var newdiv = document.createElement('div');
    newdiv.innerHTML = '<div class="panel panel-default">' +
      '<div class="panel-heading">' +
      '<h4 class="panel-title">' +
      '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + (count) + '"> ' + jobN + '</a></h4>' +
      '</div>' +
      '<div id="collapse' + (count) + '" class="panel-collapse collapse">' +
      '<div class="panel-body"> ' + jobD + '</div>' +
      '</div></div></br>';
    document.getElementById(divName).appendChild(newdiv);
    count++;
}

function updateEdit(divName) {

}
