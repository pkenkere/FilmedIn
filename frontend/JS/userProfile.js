function body_onload() {
  renderProfile();
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  Profile.onclick = Profile_onclick;
}

function renderProfile(){
  //var e = sessionStorage.getItem("email");
  var e = location.href;
  var arr = e.split("?");
  var array = arr[1].split("=");
  console.log(array[1]);
  profileGet(array[1]);
  return;
}

function HomeBtn_onclick(){
  location.href = "../HTML/announcements.html";
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

function Profile_onclick(){
  location.href = "../HTML/profile.html"; //profile button takes you back to the admin page if you are an admin???
}
