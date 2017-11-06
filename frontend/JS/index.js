
function body_onload() {
  //accounts = new Array();
  //getAccounts();
  signUp.onclick = signUp_onclick;
  loginButton.onclick = login_onclick;
}

function signUp_onclick() {
  var fname = firstname.value;
  var lname = lastname.value;
  var eml = email.value;
  var pas = pass.value;
  var rePas = rePass.value;

  if (pas !== rePas) {
    alert("Passwords don't match");
    return;
  }
  if (eml == null || fname == null || lname == null) {
    alert("Please enter all information");
    return;
  }
  if (eml == "" || fname == "" || lname == "") {
    alert("Please enter all information");
    return;
  }
  var account = JSON.stringify({
    Email : eml,
    Password : pas,
    Name : fname+" "+lname,
  });
  signupPost(account);
}

function login_onclick() {
    loginPost(loginEmail.value, passLogin.value);
  // var email = loginEmail.value;
  // var pass = passLogin.value;
  //
  // for (var i = 0; i < accounts.length; i++) {
  //   var account = accounts[i];
  //   if (account.Email == email) {
  //     if (account.Password !== pass) {
  //       alert("Incorrect Password");
  //       return;
  //     }
  //     else {
  //       localStorage.setItem("loggedInId", i);
  //       location.href = "profile.html";
  //     }
  //   }
  // }
}

function incorrectCredentials() {
  errorMsg.style.display = "block";
  strongErrorAlert.style.display = "block";
}
