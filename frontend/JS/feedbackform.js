var buttonclicked;
function body_onload() {
  YESBtn.onclick = yes_onclick;
  PARTIALLYBtn.onclick = partially_onclick;
   NOBtn.onclick = no_onclick;
  sendFeedbackBtn.onclick = send_onclick;
}

function yes_onclick() {
  console.log("clicked");
  document.getElementById("YESBtn").style.backgroudColor = "green";
// document.getElementsByClassName("tickmark1").style.display="block";
  buttonclicked = "Yes";
}

function no_onclick() {
  console.log("clicked no");
 document.getElementById("NOBtn").style.backgroundColor = "red";
  // document.getElementsByClassName("tickmark1").style.display="block";
  buttonclicked = "No";
}

function partially_onclick() {
  console.log("clicked partially");
   document.getElementById("PARTIALLYBtn").style.backgroundColor = "yellow";
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
  var text = document.getElementById('comments');
  feedbackStr = "First time " + bool +
                "Primary Reason" + selected +
                "Was Goal Achieved" + buttonclicked +
                "Professionalism" + profStr +
                "Informative" + infoStr +
                "Visually Pleasing" + vpStr +
                text;
feedbackPost(emailF.value, feedbackStr);
}
