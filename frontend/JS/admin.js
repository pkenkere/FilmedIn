var edata;
function body_onload() {
  addEquip.onclick = addEquipment;
  addAdminBtn.onclick = addAdmin;
  addNewsBtn.onclick = addNews;
  ok.onclick = updateColor;
  okay.onclick = redirect;
<<<<<<< HEAD
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
=======
  removeEq.onclick = removeEquipment;
>>>>>>> 36cf12970e5eb617c25aba542e94dc04fbdb65d0
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
  //console.log(headline);
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

function fillDiv(a) {
  document.getElementById('All').innerHTML = "hbbhbibububybvgva";
  document.getElementById('All').innerHTML = a.name;
  console.log(a);
}

function removeEquipment() {


}
