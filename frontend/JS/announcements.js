//var entries = new Array();

function body_onload() {
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  FeedbackBtn.onclick = feedbackBtn_onclick;
  Profile.onclick = Profile_onclick;
//  getAllAnnounce();
PrintAnnouncements();
  SubmitRep.onclick = submitReport;
  console.log("Crossed");
}
var annid;
function PrintAnnouncements() {
  getAllAnnounce();

}

function Profile_onclick(){
  location.href = "../HTML/profile.html";
}

function feedbackBtn_onclick() {
  location.href = "../HTML/feedbackform.html";
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
// function displayEntries(entries) {
//         console.log("entered");
//         divEntriesList.innerHTML = "";
//         for (var i = 0; i < entries.length; i++) {
//             var entry = entries[i];
//             var row = document.createElement("div");
//             var col1 = document.createElement("div");
//             var col2 = document.createElement("div");
//             var col3 = document.createElement("div");
//             row.className = "divEntriesRow";
//             col1.className = "divEntriesCol1";
//             col2.className = "divEntriesCol2";
//             col3.className = "divEntriesCol3";
//             col1.innerHTML = entry.headline;
//             col2.innerHTML = entry.desc;
//             var j = entry._id;
//             console.log(j);
//             col3.innerHTML = '<button type="button" id="' + j + '" class="btn btn-info"><span class="glyphicon glyphicon-thumbs-down"></span>Report</button>';
//             row.appendChild(col1);
//             row.appendChild(col2);
//             row.appendChild(col3);
//             divEntriesList.appendChild(row);
//
//             var btn = document.getElementById("" + j);
//             btn.onclick = openmodal;
//         }
// }

function openmodal() {
  $("#myModal").modal();
  console.log(this.id);
//  onclick = "openmodal('+entry._id+')
  //SubmitRep.onclick = submitReport(this.id);
  annid = this.id;
}

 function submitReport() {
  console.log("enter submit");
var email = reporter.value;
var title = titleR.value;
var text = document.getElementById('description').value;
reportInappropriate(email, annid, title, text);
 }
