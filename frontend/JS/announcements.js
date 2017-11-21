var edata;
function fillDivAnnounce(a) {
  //document.getElementById('All').innerHTML = "hbbhbibububybvgva";
  //document.getElementById('All').innerHTML = a[0].name;
  console.log(a);
  var allNews = a;
  var div = document.getElementById("news");
  div.innerHTML = "";
  for(var i = 0; i < allNews.length; i++){
    var row = document.createElement("div");
    var colName = document.createElement("div");
    row.Index = "delAnnounce"+i;
    row.value = allNews[i].headline;
    colName.innerHTML = allAnn[i].headline + "<B>&times;</B>";

    row.appendChild(colName);
    //row.appendChild(colDel);

    div.appendChild(row);
  }
