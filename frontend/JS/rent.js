function enable(){
  document.getElementById("btnVer").disabled = false;
}

function verify(divName) {
  var node;
  var textnode;
  var inputElements = document.getElementsByTagName('input');
  for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked == true){
        node = document.createElement('LI');
        textnode = document.createTextNode(inputElements[i].value);
        node.appendChild(textnode);
        document.getElementById(divName).appendChild(node);
      }
  }
  $('#myModal').modal('show');
}

function sub() {
  var inEl = document.getElementsByTagName('input');
  for(var i=0; inEl[i]; ++i) {
    inEl[i].checked = false;
  }
    document.getElementById("btnVer").disabled = true;
}
