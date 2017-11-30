var edata;
function body_onload() {
  addEquip.onclick = addEquipment;
  addAdminBtn.onclick = addAdmin;
  addNewsBtn.onclick = addNews;
  ok.onclick = updateColor;
  okay.onclick = redirect;
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  Profile.onclick = Profile_onclick;
  //removeEq.onclick = removeEquipment;
  //removeNews.onclick = removeAnnouncement;
}

function displayChoice (evt, option) {
  var tabcontent = document.getElementsByClassName("tabcontent");
    document.getElementById("WelcomeAdmin").style.display = "none";
  //get all elements whose clas name is tabcontent and hide them
  // console.log(tabcontent[i].id);
  var i;
  for(i = 0;i < tabcontent.length;i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
}

document.getElementById(option).style.display = "block";

evt.currentTarget.className += " active";
}

function displaySuccess() {
  SuccessAlert.style.display = "block";
}

function addEquipment() {
  var category = document.querySelector('input[name="categoryname"]:checked').value;
  console.log(category);
  var availability = document.querySelector('input[name="yesorno"]:checked').value;
  console.log(availability);
    addEquipmentPost(equipmentName.value, category, availability);
}

function addNews() {
  var headline = newsName.value;
  var description = descriptionNews.value;
  addNewsPost(headline,description);
}

function addAdmin() {
  addNewAdmin(emailInput.value);
}

function updateColor() {
  var color = document.querySelector('input[name="radioBtn"]:checked').value;
  console.log(color);
  var panel = document.getElementById("TopPanel").style.backgroundColor = color;
}

function redirect() {
  location.href = "../HTML/404notfound.html";
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

function fillDiv(a) {
  //document.getElementById('All').innerHTML = "hbbhbibububybvgva";
  //document.getElementById('All').innerHTML = a[0].name;
  console.log(a);
  var allEq = a;
  var div = document.getElementById("All");
  div.innerHTML = "";
  for(var i = 0; i < allEq.length; i++){
    var row = document.createElement("div");
    var colName = document.createElement("div");
    //var colDel = document.createElement("span");
    //colDel.innerHTML = "&times;";
    //colDel.ondblclick = "deleteEquip()";
    row.onclick = delEquip;
    row.Index = "delEq"+i;
    row.value = allEq[i].name;
    console.log(allEq[i].name);
    colName.innerHTML = allEq[i].name + "<B>&times;</B>";

    row.appendChild(colName);
    //row.appendChild(colDel);

    div.appendChild(row);
  }
}

function feedbackBtn_onclick(){
  console.log('clicked');
  location.href = "../HTML/feedbackform.html";
}

function removeEquipment() {


}

function delEquip(){
  console.log("Came here with id="+this.value);
  deleteEquip(this.value);
}

function delAnnounce(){
  deleteAnnounce(this.value);
}

function fillDivAnnounce(a) {
  console.log(a);
  var allAnn = a;
  var div = document.getElementById("dispNews");
  div.innerHTML = "";
  for(var i = 0; i < allAnn.length; i++){
    var row = document.createElement("div");
    var colName = document.createElement("div");
    //var colDel = document.createElement("span");
    //colDel.innerHTML = "&times;";
    //colDel.ondblclick = "deleteEquip()";
    row.onclick = delAnnounce;
    row.Index = "delAnnounce"+i;
    row.value = allAnn[i].headline;
    colName.innerHTML = allAnn[i].headline + "<B>&times;</B>";

    row.appendChild(colName);
    //row.appendChild(colDel);

    div.appendChild(row);
  }
}
