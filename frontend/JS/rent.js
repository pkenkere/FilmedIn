function enable(){
  document.getElementById("btnVer").disabled = false;
}

function verify(divName) {
  var newdiv = document.createElement('div');
  newdiv.innerHTML = '';

  var inputElements = document.getElementsByClassName('checkbox');
  for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
           newdiv.innerHTML = newdiv.innerHTML + (inputElements[i].value) + '</br>';
      }
    }
    document.getElementById(divName).appendChild(newdiv);
    document.getElementById("myModal").style.display = "block";
}
