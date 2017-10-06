var count = 0;

function body_onload() {
  getAccounts();
  var id = parseInt(localStorage.getItem("loggedInId"));
  var account = accounts[id];
  var fname = account.FirstName;
  var lname = account.LastName;
  $('#proName').html(fname + " " + lname);
}

//create body onload
//getAccounts
// get item from localStorage of with Key = "loggedInId"
// get info id

function updateJ(divName) {
  var jobN = $('#userJobN').val() == '' ? '---' : $('#userJobN').val();
  var jobD = $('#userJobD').val() == '' ? '---' : $('#userJobD').val();
    var newdiv = document.createElement('div');
    newdiv.innerHTML = '<div class="panel panel-default">' +
      '<div class="panel-heading">' +
      '<h4 class="panel-title">' +
      '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + (count) + '"> ' + jobN + '</a></h4>' +
      '</div>' +
      '<div id="collapse' + (count) + '" class="panel-collapse collapse">' +
      '<div class="panel-body"> ' + jobD + '</div>' +
      '</div></div></br>';
    document.getElementById(divName).appendChild(newdiv);
    count++;
}

$( document ).ready(function() {
    $('.my-input').each(function() {
        $(this).on('keyup', function() {
            var major = $('#userMajor').val() == '' ? '---' : $('#userMajor').val();
            $('#result').html("Major: " + major);
            var year = $('#userYear').val() == '' ? '---' : $('#userYear').val();
            $('#resultY').html("Year: " + year);
            var interest = $('#userInterests').val() == '' ? '---' : $('#userInterests').val();
            $('#resultI').html("Interests: " + interest);
            /*document.getElementById("result").innerHTML="Major: " + major;
            var userVer = $('#result').innerHTML;
            localStorage.userMajorEdit = userVer;*/
        });
    });
});
