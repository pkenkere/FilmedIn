function body_onload() {
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  btnSrch.onclick = search;
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

function search(){
  console.log(gender);
  console.log(RoleTypes.value);
  console.log(ageFrom.value);
  console.log(ageTo.value);
  console.log(ProductionTypes.value);
  console.log(ethnicity.value);
  var q = {
    //gender:,
    roleType: RoleTypes.value,
    minAge: ageFrom.value,
    maxAge: ageTo.value,
    type: ProductionTypes.value,
    ethnicity: ethnicity.value
  }
  var obj = JSON.stringify(q);

}