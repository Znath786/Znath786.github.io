// creating array of schoolNames for each group of bars
var barChartLabels = [];
for(var i=0; i<scores.numElements; i++){
    barChartLabels.push(scores.scoreData[i].label);
}

// creating arrays for the all the average scores per section for all schools
var readingScore =[];
for (var i=0; i<scores.numElements; i++){
    readingScore.push(scores.scoreData[i].avgCR);
}
var mathScore=[];
for (var i=0; i<scores.numElements; i++){
    mathScore.push(scores.scoreData[i].avgMath);
}
var writingScore=[];
for (var i=0; i<scores.numElements; i++){
    writingScore.push(scores.scoreData[i].avgWriting);
}

// inserting a grouped bar chart
// where each school has bars for each section
new Chart(document.getElementById("groupedBarChart"), {
    type: 'bar',
    data: {
        labels: barChartLabels,
        datasets: [
            {
                label: "Critical Reading",
                backgroundColor: "rgb(200, 0, 200)",
                data: readingScore
            }, {
                label: "Math",
                backgroundColor: "rgb(0, 100, 255)",
                data: mathScore
            }, {
                label: "Writing",
                backgroundColor: "rgb(100, 255, 0)",
                data: writingScore
            }
        ]
    },
    // displaying a title and labels for each axis
    options: {
        title: {
            display: true,
            text: scores.title
        },
        scales: {
            xAxes: [{
                scaleLabel:{
                    display: true,
                    labelString: scores.xAxis
                }
            }],
            yAxes: [{
                scaleLabel:{
                    display: true,
                    labelString: scores.yAxis
                }
            }]
        }
    }
});


