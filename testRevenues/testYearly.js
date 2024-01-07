
async function queryRevenues() {
    const query = { "query": "query{\n    daoRevenues(filter:{kpi:{equalTo:\"yearly\"}}){\n      nodes{\n        kpi\n        range\n        usd\n      }\n    }\n}", "variables": {} };
    const response = await fetch("https://api.dev.data.sandbox.game/dev/graphql", {
        method: "POST",
        headers: {
            "x-api-key": "BMEmLhfm2V1U28d27ZzMs4JVsXID1wey2TQ6A1g4",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    });
    console.log(response);
    const data = await response.json();
    console.log("mydata:" + data);
}

queryRevenues();

const receivedData = { "data": { "daoRevenues": { "nodes": [{ "kpi": "yearly", "range": "2019", "usd": 10280.22 }, { "kpi": "yearly", "range": "2020", "usd": 299378.25 }, { "kpi": "yearly", "range": "2021", "usd": 7422539.7 }, { "kpi": "yearly", "range": "2022", "usd": 5344214.2 }, { "kpi": "yearly", "range": "2023", "usd": 481854.97 }] } } };
const JsonData = JSON.parse(JSON.stringify(receivedData));
const nodes = JsonData.data.daoRevenues.nodes;

const years = ["2023"]; //nodes.map(node => node.range); //["2019", "2020", "2021", "2022", "2023"],
const revenues = [477869];//nodes.map(node => node.usd); //[10280, 299378, 7422539, 5344214, 481854]
const nbOfYear = years.length;
let backgroundColors = [];

for (let i = 0; i < nbOfYear; i++) {
    backgroundColors.push("#00AAEF");
}

var ctx = document.getElementById('yearlyRevenuesChart');
var parent = ctx.parentElement;
parent.style.height = "100%";
parent.style.width = "100%";

var yearlyRevenuesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: years,
        datasets: [{
            data: revenues,
            backgroundColor: backgroundColors,
        }]
    },
    options: {
        plugins: {
            legend: false,
            tooltip: true,
        }
    }
});