
let storedScorecard = localStorage.getItem(today);
Object.assign(scorecard, JSON.parse(storedScorecard));
console.log(storedScorecard);
let scoreKeys = Object.keys(localStorage);
console.log(scoreKeys);


var kpiChart = new Chart("kpi-chartDiv", {
    type: "bar",
    data: {
      labels: scoreKeys,
      datasets: [{
        label: "KPI Ratio",
        backgroundColor: "#ffd972",
        borderColor: "hsl(49, 63%, 44%)",
        data: [scorecard.kpiratio]
      }]
    },
    options: {}
  });