var count = 0;

function body_onload() {
  renderProfile();
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
