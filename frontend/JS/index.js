
function body_onload() {
  signUp.onclick = signUp_onclick;
  loginButton.onclick = login_onclick;
  resetPwBtn.onclick = resetPWB_onclick;
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
    Name : fname+lname,
  });
  signupPost(account);
}

function login_onclick() {
    loginPost(loginEmail.value, passLogin.value);
}

function incorrectCredentials() {
  errorMsg.style.display = "block";
  strongErrorAlert.style.display = "block";
}

function resetPWB_onclick() {
  sendEmail(loginEmail.value);
}
