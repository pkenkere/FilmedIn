function body_onload() {
  document.getElementById('LogoutBtn').onclick = logout_onclick;
    document.getElementById('ProfBtn').onclick = findTalent_onclick;
}

function logout_onclick() {
  localStorage.removeItem("loggedInId");
  location.href = "splash.html";
}

function findTalent_onclick() {
  location.href = "findTalent.html";
}


var count = 0;


function updateR(divName) {
  var rolename = $('#rolename').val() == '' ? '---' : $('#rolename').val();

  var rI = document.getElementById('RoleTypes');
  var roletype= rI.options[rI.selectedIndex].value;

  var gender = document.querySelector('input[name="gender"]:checked').value;

  var age = document.getElementById("range").value;

  var eI= document.getElementById('ethnicity');
  var ethnicity = eI.options[eI.selectedIndex].value;

  var roledesc = $('#roledesc').val() == '' ? '---' : $('#roledesc').val();

    var newdiv = document.createElement('div');
    newdiv.innerHTML = '<div class="panel panel-default">' +
      '<div class="panel-heading">' +
      '<h4 class="panel-title">' +
      '<a data-toggle="collapse" data-parent="#role-accordion" href="#col' + (count) + '"> ' + rolename + '</a></h4>' +
      '</div>' +
      '<div id="col' + (count) + '" class="panel-collapse collapse">' +
      '<div class="panel-body">' +
      '<div>Role Name: ' + rolename + '</div>' +
      '<div>Role Type: ' + roletype + '</div>' +
      '<div>Role Gender: ' + gender + '</div>' +
      '<div>Role Age: ' + age + '</div>' +
      '<div>Role Ethnicity: ' + ethnicity + '</div>' +
      '<div>Role Description: ' + roledesc + '</div>' +
      '</div>' +
      '</div></div></br>';
    document.getElementById(divName).appendChild(newdiv);
    count++;
}
