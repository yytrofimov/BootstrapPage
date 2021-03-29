function createDataTable(shortcuts, requiredData, outputDivID) {
    let table = document.createElement("table");
    table.className = "table";
    let tableHead = document.createElement("thead");
    table.appendChild(tableHead);
    let labelString = document.createElement("tr");

    for (label of requiredData) {
        let labelCell = document.createElement("th");
        labelCell.innerHTML = label;
        labelString.appendChild(labelCell);
    }
    tableHead.appendChild(labelString);
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    for (shortcut of shortcuts) {
        let tableString = document.createElement("tr");
        for (label of requiredData) {
            let stringCell = document.createElement("th");
            stringCell.innerHTML += shortcut[label];
            tableString.appendChild(stringCell);
        }
        tableBody.append(tableString);
    }
    let outDiv = document.getElementById(outputDivID);

    outDiv.appendChild(table);
}

function axiosGetJSON(pathToFile, requiredData, outputDivID) {
    let dataset = [];
    axios.get(pathToFile).then((response) => {
        for (i of response.data) {
            dataset.push(i);
        }
        createDataTable(dataset, requiredData, outputDivID);
    });
    return dataset;
}

axiosGetJSON("data/courses_1 copy.json", ["kurs", "kunskapspoäng"], "output_1");
