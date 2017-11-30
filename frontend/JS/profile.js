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
  renderEquipments();
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  FeedbackBtn.onclick = feedbackBtn_onclick;
}

function renderProfile(){
  var e = sessionStorage.getItem("email");
  profileGet(e);
}

function renderEquipments() {
  var e = sessionStorage.getItem("email");
  equipmentGet(e);
}
function feedbackBtn_onclick() {
  location.href = "../HTML/feedbackform.html";
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

function updateJ(divName) {
  /*var major = $('#userMajor').val() == '' ? '---' : $('#userMajor').val();
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
    count++;*/

    var email = sessionStorage.getItem("email");

    var profile = {
      email : email,
      major : userMajor.value,
      year : userYear.value,
      interest : userInterests.value,
      linkedInLink : userLinked.value,
      facebookLink : userFace.value,
      instagramLink : userInsta.value,
      resumeLink : userResume.value
      /*job : {
        job_name : userJobN.value,
        job_desc : userJobD.value
      }*/
    };

    profileUpdate(email, profile);
}

function updateEdit(divName) {

}
