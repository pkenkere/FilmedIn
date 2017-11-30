//var entries = new Array();

function body_onload() {
  getAllAnnounce();
//  displayEntries();
  console.log("Crossed");
}

function displayEntries(entries) {
        console.log("entered");
        divEntriesList.innerHTML = "";
        console.log(entries.length);
        for (var i = 0; i < entries.length; i++) {
          console.log(entries.length);
            var entry = entries[i];
            console.log(entry);
            var row = document.createElement("div");
            var col1 = document.createElement("div");
            var col2 = document.createElement("div");
            var col3 = document.createElement("div");
            row.className = "divEntriesRow";
            col1.className = "divEntriesCol1";
            col2.className = "divEntriesCol2";
            col3.className = "divEntriesCol3";
            col1.innerHTML = entry.headline;
            col2.innerHTML = entry.desc;
            col3.innerHTML = '<button type="button" id="News'+i+'" class="btn btn-info"><span class="glyphicon glyphicon-thumbs-down"></span>Report</button>';
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            divEntriesList.appendChild(row);
        }
}
