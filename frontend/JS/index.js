
function body_onload() {
  //accounts = new Array();
  //getAccounts();
  signUp.onclick = signUp_onclick;
  loginButton.onclick = login_onclick;
}

function signUp_onclick() {
<<<<<<< HEAD
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
=======
  // var pass = document.getElementById('pass').value;
  // var rePass = document.getElementById('rePass').value;
  //
  // if (pass !== rePass) {
  //   alert("Passwords don't match");
  //   return;
  // }
  // var email = document.getElementById('email').value;
  // var firstname = document.getElementById('firstname').value;
  // var lastname = document.getElementById('lastname').value;
  // if (email == null || firstname == null || lastname == null) {
  //   alert("Please enter all information");
  //   return;
  // }
  // if (email == "" || firstname == "" || lastname == "") {
  //   alert("Please enter all information");
  //   return;
  // }
  // var account = {
  //   Email : email,
  //   Password : pass,
  //   FirstName : firstname,
  //   LastName : lastname
  // };
  //
  // accounts.push(account);
  // saveAccounts();
  //
  // localStorage.setItem("loggedInId", accounts.length - 1);
  // location.href = "permInfo.html";
>>>>>>> 82f565f36b3f413c84537c79c2c37602d2100793
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
