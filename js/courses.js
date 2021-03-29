function createCoursesTable(dataset, requiredData, outputDivID) {
    const rate = 18;
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

    let labelCell = document.createElement("th");
    labelCell.innerHTML = "Timmar (h)";
    labelString.appendChild(labelCell);
    tableHead.appendChild(labelString);

    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    let sum = 0;
    for (sample of dataset) {
        let tableString = document.createElement("tr");
        for (label of requiredData) {
            if (label != "Kurs") {
                sum += sample[label];
            }
            let stringCell = document.createElement("th");
            stringCell.innerHTML += sample[label];
            tableString.appendChild(stringCell);
        }
        let stringCell = document.createElement("th");
        stringCell.innerHTML += sample[requiredData[1]] * rate;
        tableString.appendChild(stringCell);
        tableBody.append(tableString);
    }
    console.log(sum);

    console.log(requiredData.length);
    let tableString = document.createElement("tr");
    let stringCell = document.createElement("th");
    stringCell.innerHTML += "Totals";
    tableString.appendChild(stringCell);
    for (let i = 0; i < requiredData.length - 1; i++) {
        let stringCell = document.createElement("th");
        stringCell.innerHTML += sum;
        tableString.appendChild(stringCell);
    }
    stringCell = document.createElement("th");
    stringCell.innerHTML += sum * rate;
    tableString.appendChild(stringCell);
    tableBody.append(tableString);
    let outDiv = document.getElementById(outputDivID);
    outDiv.appendChild(table);
}

function axiosGetJSON(pathToFile, requiredData, outputDivID) {
    let dataset = [];
    let gifout = document.getElementById(outputDivID);
    let gifimg = document.createElement("img");
    gifimg.src = "./img/giphy.gif";
    gifout.appendChild(gifimg);
    axios.get(pathToFile).then((response) => {
        for (i of response.data) {
            dataset.push(i);
        }
        createCoursesTable(dataset, requiredData, outputDivID);
    });
    gifimg.src = "";
    return dataset;
}

axiosGetJSON("data/courses_1 copy.json", ["Kurs", "Kunskapspoäng (kp)"], "output_1");


function createCoursesDiagram(outputDivID) {
    let ctx = document.getElementById("output_2")
    data = {
        datasets: [{
            data: [10, 20, 30]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };
    options = {}
    let myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}

// createCoursesDiagram('output_2')

new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});