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
  var q = {
    //gender:,  ASK MEEEENNNUUU <<<<<<<--------------------------
    name: profName.value,
    minAge: ageFrom.value,
    maxAge: ageTo.value,
    ethnicity: ethnicity.value
  }
  var obj = "/profiles?";
  console.log(profName.value);
  if(profName.value != null && profName.value != ""){
    obj += "name="+profName.value+"&";
  }
  if(ageFrom.value != null && ageFrom.value != ""){
    obj += "minAge="+ageFrom.value+"&";
  }
  if(ageTo.value != null && ageTo.value != ""){
    obj += "maxAge="+ageTo.value+"&";
  }
  // if(ProductionTypes.value != null && ProductionTypes.value != ""){
  //   obj += "type="+ProductionTypes.value+"&";
  // }
  if(ethnicity.value != null && ethnicity.value != ""){
    if(ethnicity.value != "All Ethnicities")
      obj += "ethnicity="+ethnicity.value+"&";
  }
  obj = obj.substring(0,obj.length-1);
  console.log(obj);
  console.log(encodeURI(obj));
  talentGet(encodeURI(obj));
}

// function displayProfs() {
//   var box = document.getElementById("talentCont");
//   for (var i = 0; i < gTalent.length; i++) {
//     var person = gTalent[i];
//     var newdiv = document.createElement('div');
//     newdiv.innerHTML = '<div class="card" style="width:400px">' +
//       '<img class="card-img-top" src=' + person.image + 'alt="Card image" style="width:100%">' +
//       '<div class="card-body">' +
//       '<h4 class="card-title">' + person.Name + '</h4>' +
//       '<p class="card-title">Brief Description</p>' +
//       '<a href="#" class="btn btn-primary">See Profile</a>' +
//       '</div></div>';
//     box.appendChild(newdiv);
//   }
// }

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

function fillTalent(talent){
  console.log(talent);
  srchTalent.innerHTML = "";
  for(var i = 0; i<talent.length; i++){
    var row = srchTalent.insertRow(i);
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");

    col1.innerHTML = "<a href='../HTML/userProfile.html?profile="+talent[i].email+"'>"+talent[i].name+"<a>";
    col2.innerHTML = talent[i].age;
    col3.innerHTML = talent[i].gender;

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
  }
}