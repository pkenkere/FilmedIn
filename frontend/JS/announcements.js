function body_onload() {
  displayEntries;
  console.log("Crossed");
}

function displayEntries() {
        console.log("entered");
        divEntriesList.innerHTML = "";
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            console.log(entry);
            var row = document.createElement("div");
            var col1 = document.createElement("div");
            var col2 = document.createElement("div");
            row.className = "divEntriesRow";
            row.Index = i;
            col1.className = "divEntriesCol1";
            col2.className = "divEntriesCol2";
            col1.innerHTML = entry.headline;
            col2.innerHTML = entry.desc;
            row.appendChild(col1);
            row.appendChild(col2);
            divEntriesList.appendChild(row);
        }
}
