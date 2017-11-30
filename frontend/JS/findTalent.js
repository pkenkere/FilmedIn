function body_onload() {
  document.getElementById('btnSrch').onclick = btnSrch_onclick;
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  FeedbackBtn.onclick = feedbackBtn_onclick;
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

function displayProfs() {
  var box = document.getElementById("talentCont");
  for (var i = 0; i < gTalent.length; i++) {
    var person = gTalent[i];
    var newdiv = document.createElement('div');
    newdiv.innerHTML = '<div class="card" style="width:400px">' +
      '<img class="card-img-top" src=' + person.image + 'alt="Card image" style="width:100%">' +
      '<div class="card-body">' +
      '<h4 class="card-title">' + person.Name + '</h4>' +
      '<p class="card-title">Brief Description</p>' +
      '<a href="#" class="btn btn-primary">See Profile</a>' +
      '</div></div>';
    box.appendChild(newdiv);
  }
}

function HomeBtn_onclick(){
  location.href = "../HTML/announcements.html";
  // location.href = "../HTML/newsfeed.html";
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

function feedbackBtn_onclick(){
  location.href = "../HTML/feedbackform.html";
}

function logout_onclick() {
  localStorage.removeItem("loggedInId");
  location.href = "../HTML/index.html";
}
