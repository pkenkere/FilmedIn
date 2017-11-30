function body_onload(){
  HomeBtn.onclick = HomeBtn_onclick;
  JobsBtn.onclick = JobsBtn_onclick;
  ProfBtn.onclick = ProfBtn_onclick;
  PostJobBtn.onclick = PostJobBtn_onclick;
  LogoutBtn.onclick = logout_onclick;
  RentBtn.onclick = rentBtn_onclick;
  FeedbackBtn.onclick = feedbackBtn_onclick;
  getAllEquip()
}

function enable(){
  document.getElementById("btnVer").disabled = false;
}

function disable() {
  document.getElementById("btnVer").disabled = true;
}
var arr = new Array();
function verify(divName) {
  disable();

  var node = document.getElementById(divName);
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  var textnode;
  var inputElements = document.getElementsByTagName('input');
  // for(var i=0; i<inputElements.length; i++){
  //   inputElements[i].checked = false;
  // }
  arr.length = 0;
  var dateFrom = document.getElementById('dateFrom');
  node = document.createElement('LI');
  textnode = document.createTextNode('DATE FROM: ' + (dateFrom.value));
  node.appendChild(textnode);
  document.getElementById(divName).appendChild(node);

  var dateTo = document.getElementById('dateTo');
  node = document.createElement('LI');
  textnode = document.createTextNode('DATE TO: ' + (dateTo.value));
  node.appendChild(textnode);
  document.getElementById(divName).appendChild(node);

  for(var i=0; i<inputElements.length; i++){
      if(inputElements[i].checked == true){
        node = document.createElement('LI');
        textnode = document.createTextNode(inputElements[i].value);
        node.appendChild(textnode);
        document.getElementById(divName).appendChild(node);
        var obj = {
        	name: inputElements[i].innerHTML,
        	category: inputElements[i].id
        };
        arr.push(obj);
      }
  }
  $('#myModal').modal('show');
}

function sub() {
  var myNode = document.getElementById("myList");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  var inEl = document.getElementsByTagName('input');
  // getAllEquip();
  for(var i=0; inEl[i]; ++i) {
    inEl[i].checked = false;
  }
  document.getElementById("btnVer").disabled = true;
  var email = sessionStorage.getItem("email");
  var dateFrom = document.getElementById('dateFrom').value;
  var dateTo = document.getElementById('dateTo').value;
  rentEquipmentPost(arr, email, dateFrom, dateTo);
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

function feedbackBtn_onclick(){
  console.log('clicked');
  location.href = "../HTML/feedbackform.html";
}

function logout_onclick() {
  localStorage.removeItem("loggedInId");
  location.href = "../HTML/index.html";
}

// var arreee = new Array();
// arreee.length = 0;
// for (var i=0; i < 5; i++) {
//   var obj = {
//     name: "uwbfowuqyefglasdifh,sdb",
//     category: "camKit"
//   };
//   arreee.push(obj);
// }

 // function displayEquip() {
 //   for (var i = 0; i < arreee.length; i++) {
 //     var equip = arreee[i];
 //     var label= document.createElement("label");
 //     var description = document.createTextNode(equip.name);
 //     var checkbox = document.createElement("input");
 //
 //     checkbox.type = "checkbox";    // make the element a checkbox
 //     checkbox.id = i;      // give it id
 //     checkbox.value = equip.name;         // make its value
 //
 //     label.appendChild(checkbox);   // add the box to the element
 //     label.appendChild(description);// add the description to the element
 //
 //     // add the label element to your div
 //     document.getElementById(equip.category).appendChild(label);
 //   }
 // }
