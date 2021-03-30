function createCoursesOut(dataset, requiredData, tableID, chartID) {
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

    let points = [];
    let labels = []
    for (sample of dataset) {
        let tableString = document.createElement("tr");
        for (label of requiredData) {
            if (label != "Kurs") {
                points.push(sample[label]);
            }
            else {
                labels.push(sample[label])
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

    let tableString = document.createElement("tr");
    let stringCell = document.createElement("th");
    stringCell.innerHTML += "Totals";
    tableString.appendChild(stringCell);

    for (let i = 0; i < requiredData.length - 1; i++) {
        let stringCell = document.createElement("th");
        stringCell.innerHTML += points.reduce((a, b) => a + b, 0);
        tableString.appendChild(stringCell);
    }
    stringCell = document.createElement("th");
    stringCell.innerHTML += points.reduce((a, b) => a + b, 0) * rate;
    tableString.appendChild(stringCell);
    tableBody.append(tableString);

    let outDiv = document.getElementById(tableID);
    outDiv.appendChild(table);
    console.log(labels)
    new Chart(document.getElementById(chartID), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Kurser våren 2021",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850","#3e95cd", "#8e5ea2", "#3cba9f","#c45850"],
                    data: points,
                },
            ],
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Kurser våren 2021",
            },
        },
    });
}

function courseHandler(pathToFile, requiredData, tableID,chartID) {
    let dataset = [];
    let gifout = document.getElementById(tableID);
    let gifimg = document.createElement("img");
    gifimg.src = "./img/giphy.gif";
    gifout.appendChild(gifimg);
    axios.get(pathToFile).then((response) => {
        for (i of response.data) {
            dataset.push(i);
        }
        createCoursesOut(dataset, requiredData, tableID,chartID);
    });
    gifimg.src = "";
    return dataset;
}

courseHandler("data/courses_1 copy.json", ["Kurs", "Kunskapspoäng (kp)"], "course-table",'course-chart');


