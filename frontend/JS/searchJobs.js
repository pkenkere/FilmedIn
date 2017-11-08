function body_onload() {
  document.getElementById('PostJobBtn').onclick = postJob_onclick;
  document.getElementById('LogoutBtn').onclick = logout_onclick;
  document.getElementById('ProfBtn').onclick = findTalent_onclick;
}

function postJob_onclick() {
  location.href = "Jobpost.html";
}

function logout_onclick() {
  localStorage.removeItem("loggedInId");
  location.href = "splash.html";
}

function findTalent_onclick() {
  location.href = "findTalent.html";
}
