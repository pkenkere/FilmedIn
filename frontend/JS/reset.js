
function body_onload() {


  submitPassword.onclick = submit_onclick;
}

function submit_onclick() {
  console.log(email2.value);
  console.log(pass2.value);
  resetPW(email2.value, pass2.value);
}
