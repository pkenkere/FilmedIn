function body_onload(){
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
}

function enable(){
  document.getElementById("btnVer").disabled = false;
}

function verify(divName) {
  var node;
  var textnode;
  var inputElements = document.getElementsByTagName('input');
  for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked == true){
        node = document.createElement('LI');
        textnode = document.createTextNode(inputElements[i].value);
        node.appendChild(textnode);
        document.getElementById(divName).appendChild(node);
      }
  }
  $('#myModal').modal('show');
}

function sub() {
  var inEl = document.getElementsByTagName('input');
  getAllEquip();
  for(var i=0; inEl[i]; ++i) {
    inEl[i].checked = false;
  }
    document.getElementById("btnVer").disabled = true;
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

function displayEquip() {
  for (var i = 0; i < gEquip.length; i++) {
    var equip = gEquip[i];
    var some = document.createElement("input");
    some.setAttribute("type", "checkbox");
    some.setAttribute("value", equip.Value);
    some.innerHTML = equip.textDisplay;
    var categ = document.getElementById(equip.categId);
    categ.appendChild(some);
  }
}
