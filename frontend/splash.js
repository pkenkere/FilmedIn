
function body_onload() {
  //accounts = new Array();
  getAccounts();
  signUp.onclick = signUp_onclick;
  loginButton.onclick = login_onclick;
}

function signUp_onclick() {
  var pass = document.getElementById('pass').value;
  var rePass = document.getElementById('rePass').value;

  if (pass !== rePass) {
    alert("Passwords don't match");
    return;
  }
  var email = document.getElementById('email').value;
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  if (email == null || firstname == null || lastname == null) {
    alert("Please enter all information");
    return;
  }
  if (email == "" || firstname == "" || lastname == "") {
    alert("Please enter all information");
    return;
  }
  var account = {
    Email : email,
    Password : pass,
    FirstName : firstname,
    LastName : lastname
  };

  accounts.push(account);
  saveAccounts();
  location.href = "splash.html";
}

function login_onclick() {
  var email = loginEmail.value;
  var pass = passLogin.value;

  for (var i = 0; i < accounts.length; i++) {
    var account = accounts[i];
    if (account.Email == email) {
      if (account.Password !== pass) {
        alert("Incorrect Password");
        return;
      }
      else {
        localStorage.setItem("loggedInId", i);
        location.href = "profile.html";
      }
    }
  }
}
