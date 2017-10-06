var accounts = new Array();

function saveAccounts() {
  var json = JSON.stringify(accounts);
  localStorage.setItem("accounts", json);
}

function getAccounts() {
  accounts = new Array();
  var json = localStorage.getItem("accounts");
  if (json == null)
    return;

  accounts = JSON.parse(json);
}
