function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
async function getCourses(pathToFile) {
    let courses = [];
    await axios.get(pathToFile).then((response) => {
        for (i of response.data) {
            courses.push(i);
        }
    });
    return courses;
}
function getCoursesTableObj(courses, rate, requiredData, nonSummable = ["Kurs"]) {
    requiredData.push("Timmar (h)");
    function getTableStringObj(stringData) {
        let tableString = document.createElement("tr");
        for (let i of stringData) {
            let stringCell = document.createElement("th");
            stringCell.innerHTML = i;
            tableString.appendChild(stringCell);
        }
        return tableString;
    }
    let table = document.createElement("table");
    table.className = "table table-responsive";
    table.appendChild(getTableStringObj(requiredData));
    let sums = {};
    for (let i of courses) {
        i["Timmar (h)"] = i["Kunskapspoäng (kp)"] * rate;
        let stringData = [];
        for (let j of requiredData) {
            stringData.push(i[j]);
            if (nonSummable.indexOf(j) == -1) {
                if (sums[j]) {
                    sums[j].push(i[j]);
                } else {
                    sums[j] = [i[j]];
                }
            }
        }
        table.appendChild(getTableStringObj(stringData));
    }
    let lastStringData = ["Totals"];
    for (let i of requiredData) {
        if (nonSummable.indexOf(i) == -1) {
            lastStringData.push(sums[i].reduce((a, b) => a + b, 0));
        } else if (i == "Kurs") {
            //pass
        } else {
            lastStringData.push("-");
        }
    }
    table.appendChild(getTableStringObj(lastStringData));
    return table;
}
function getCoursesChart(courses, requiredData, coursesChartID) {
    let labels = [];
    let colors = [];
    let points = [];
    for (i of courses) {
        labels.push(i["Kurs"]);
        colors.push(getRandomColor());
        points.push(i[requiredData]);
    }
    new Chart(document.getElementById(coursesChartID), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Kurser våren 2021",
                    backgroundColor: colors,
                    data: points,
                },
            ],
        },
        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Kurser våren 2021",
            },
        },
    });
}
async function coursesHandler(pathToFile, rate, coursesTableID, coursesChartID) {
    let courses = await getCourses(pathToFile);
    document
        .getElementById(coursesTableID)
        .appendChild(getCoursesTableObj(courses, rate, ["Kurs", "Kunskapspoäng (kp)"]));
    getCoursesChart(courses, "Timmar (h)", coursesChartID);
}
coursesHandler("data/courses-1.json", 18, "courses-table", "courses-chart");
