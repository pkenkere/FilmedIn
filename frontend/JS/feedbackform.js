function body_onload() {
  YESBtn.onclick = yes_onclick;
  // PARTIALLYBtn.onclick = partially_onclick;
  // NOBtn.onlick = no_onclick;
}

function yes_onclick() {
  console.log("clicked");
  // document.getElementsByClassName("tickmark1").style.display="block";
  document.getElementById('YESBtn').style.backgroundColor = "green";
}
