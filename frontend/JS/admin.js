function body_onload() {
  addEquip.onclick = addEquipment;
}

function displayChoice (evt, option) {
  var tabcontent = document.getElementsByClassName("tabcontent");
  //get all elements whose clas name is tabcontent and hide them
  // console.log(tabcontent[i].id);
  var i;
  for(i = 0;i < tabcontent.length;i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
}

document.getElementById(option).style.display = "block";
evt.currentTarget.className += " active";
}

function equipmentAdded() {
  SuccessAlert.style.display = "block";
}

function addEquipment() {
  var category = document.querySelector('input[name="categoryname"]:checked').value;
  var availability = document.querySelector('input[name="yesorno"]:checked').value;
    addNewEquipment(equipmentName.value, category, availability);
}
