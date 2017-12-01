function body_onload() {
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  btnSrch.onclick = search;
  FeedbackBtn.onclick = feedbackBtn_onclick;
}

function HomeBtn_onclick(){
  location.href = "../HTML/newsfeed.html";
}

function feedbackBtn_onclick(){
  console.log('clicked');
  location.href = "../HTML/feedbackform.html";
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
  // console.log(gender);
  // console.log(RoleTypes.value);
  // console.log(ageFrom.value);
  // console.log(ageTo.value);
  // console.log(ProductionTypes.value);
  // console.log(ethnicity.value);
  var q = {
    //gender:,  ASK MEEEENNNUUU <<<<<<<--------------------------
    roleType: RoleTypes.value,
    minAge: ageFrom.value,
    maxAge: ageTo.value,
    type: ProductionTypes.value,
    ethnicity: ethnicity.value
  }
  var obj = "/jobs/search?";
  if(RoleTypes.value != null && RoleTypes.value != ""){
    obj += "roleType="+RoleTypes.value+"&";
  }
  if(ageFrom.value != null && ageFrom.value != ""){
    obj += "minAge="+ageFrom.value+"&";
  }
  if(ageTo.value != null && ageTo.value != ""){
    obj += "maxAge="+ageTo.value+"&";
  }
  if(ProductionTypes.value != null && ProductionTypes.value != ""){
    obj += "type="+ProductionTypes.value+"&";
  }
  if(ethnicity.value != null && ethnicity.value != ""){
    obj += "ethnicity="+ethnicity.value+"&";
  }
  obj = obj.substring(0,obj.length-1);
  console.log(obj);
  console.log(encodeURI(obj));
  searchPost(encodeURI(obj));
}

function fillJobs(jobs){
  console.log(jobs);
  srchResults.innerHTML = "";
  for(var i = 0; i < jobs.length; i++){
    //var row = document.createElement("tr");
    var row = srchResults.insertRow(i);    
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");
    var col4 = document.createElement("button");
    
    //row.info = jobs[i];
    //row.onclick = row_onclickFunc;
    col1.innerHTML = jobs[i].title;
    col2.innerHTML = jobs[i].type;
    col3.innerHTML = "<B>+</B>";
    col4.innerHTML = "Apply";
    col4.onclick = applyJob;
    col4.info = jobs[i];

    col3.info = jobs[i];
    col3.onclick = row_onclickFunc;

    //col4.onclick = applyJob;

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);

    //row.insertCell(0);

    //srchResults.innerHTML = row;
    // var col1 = row.insertCell(0);
    // col1.innerHTML = jobs[i].title;
  }
}

function row_onclickFunc(){
  console.log(this.info);
  //Disp a Modal that shows all the details of the job
  mdlTitle.innerHTML = this.info.title;
  mdlType.innerHTML = this.info.type;
  mdlDesc.innerHTML = this.info.desc;
  mdlEmployer.innerHTML = this.info.email;
  $('#myModal').modal();
}

function applyJob(){
  console.log(this.info);
  var j = this.info;
  //Confirm with which role they want to apply
  var allRoles = j.roles;
  roleBody.innerHTML = "";
  for(var i = 0; i < allRoles.length; i++){
    var row = document.createElement("div");
    var type = document.createElement("div");
    var slct = document.createElement("button");

    type.innerHTML = allRoles[i].type;

    slct.innerHTML = "Apply";
    slct.onclick = role_onclick;
    slct.id = j._id;
    slct.rl = allRoles[i];

    row.appendChild(type);
    row.appendChild(slct);

    roleBody.appendChild(row);
  }
  $('#myRoleModal').modal();
}

function role_onclick(){
  console.log(this.id);
  console.log(sessionStorage.getItem("email"));
  console.log(this.rl);
  var obj = {
    id: this.id,
    userEmail: sessionStorage.getItem("email"),
    role: this.rl
  }
  jobApplyPost(obj);
}