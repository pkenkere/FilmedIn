var buttonclicked;
function body_onload() {
  YESBtn.onclick = yes_onclick;
  PARTIALLYBtn.onclick = partially_onclick;
   NOBtn.onclick = no_onclick;
  sendFeedbackBtn.onclick = send_onclick;
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  Profile.onclick = Profile_onclick;
}

function yes_onclick() {
  console.log("clicked");
  document.getElementById("YESBtn").style.backgroundColor = "green";
  document.getElementById("NOBtn").style.backgroundColor = "white";
  document.getElementById("PARTIALLYBtn").style.backgroundColor = "white";
  document.getElementById("optionalQ").style.display = "none";
// document.getElementsByClassName("tickmark1").style.display="block";
  buttonclicked = "Yes";
}

function no_onclick() {
  console.log("clicked no");
 document.getElementById("NOBtn").style.backgroundColor = "red";
 document.getElementById("YESBtn").style.backgroundColor = "white";
 document.getElementById("PARTIALLYBtn").style.backgroundColor = "white";
  // document.getElementsByClassName("tickmark1").style.display="block";
  buttonclicked = "No";
  document.getElementById("optionalQ").style.display = "block";
}

function partially_onclick() {
  console.log("clicked partially");
   document.getElementById("PARTIALLYBtn").style.backgroundColor = "yellow";
   document.getElementById("NOBtn").style.backgroundColor = "white";
   document.getElementById("YESBtn").style.backgroundColor = "white";
   document.getElementById("optionalQ").style.display = "block";
  // document.getElementsByClassName("tickmark1").style.display="block";
  buttonclicked = "Partially";
}

function send_onclick() {
  var feedbackStr;
  var bool = document.querySelector('input[name="radioBtn"]:checked').value;
  var list1 = document.getElementById('answers');
  var selected = list1.options[list1.selectedIndex].value;
  var list2 = document.getElementById('options');
  var ans = list2.options[list2.selectedIndex].value;
  var profStr, infoStr, vpStr;
  var prof = document.querySelector('input[name="Professionalscale"]:checked').value;
  if(prof == '1')
    profStr = "Below Expectations";
  else if(prof == '2')
    profStr = "Meets Expectations";
  else if(prof == '3')
    profStr = "Exceeds Expectations"
  var info = document.querySelector('input[name="Informativescale"]:checked').value;
  if(info == '1')
    infoStr = "Below Expectations";
  else if(info == '2')
    infoStr = "Meets Expectations";
  else if(info == '3')
    infoStr = "Exceeds Expectations"
  var vp = document.querySelector('input[name="VPscale"]:checked').value;
  if(vp == '1')
    vpStr = "Below Expectations";
  else if(vp == '2')
    vpStr = "Meets Expectations";
  else if(vp == '3')
    vpStr = "Exceeds Expectations"
  var text = document.getElementById('comments').value;
  feedbackStr = "First time: " + bool + '\n'
                "Primary Reason: " + selected + '\n'
                "Was Goal Achieved: " + buttonclicked + '\n'
                "Professionalism: " + profStr + '\n'
                "Informative: " + infoStr + '\n'
                "Visually Pleasing: " + vpStr + '\n'
                text;
feedbackPost(emailF.value, feedbackStr);
}

function HomeBtn_onclick(){
  location.href = "../HTML/announcements.html";
  //location.href = "../HTML/newsfeed.html";
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
