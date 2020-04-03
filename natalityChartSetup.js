// array of the labels for each section of the pie chart
var pieChartLabels = [];
for(var i=0; i<natalityData.numElements; i++){
    pieChartLabels.push(natalityData.birthData[i].label);
}

// array of the number of live births per demographic
var liveBirths = [];
for(var i=0; i<natalityData.numElements; i++){
    liveBirths.push(natalityData.birthData[i].number);
}

// array of all the percent values for each demographic
// in case data is to be displayed percentage-wise
var percent = [];
for(var i=0; i<natalityData.numElements; i++){
    percent.push(natalityData.birthData[i].number);
} 

//insert new pie chart 
new Chart(document.getElementById("pieChart"), {
    type: 'pie',
    data: {
      labels: pieChartLabels,
      datasets: [{
        label: "Live Births",
        backgroundColor: ["red", "orange","yellow","green","blue", "cyan", "magenta", "pink", "gray", "lime"],
        data: liveBirths 
      }]
    },
    options: {
        title: {
            display: true,
            text: natalityData.title
        },
    }
});
