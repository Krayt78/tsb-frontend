
async function queryRevenues() {
    const query = { "query": "query{\n    daoRevenues(filter:{kpi:{equalTo:\"monthly\"}}){\n      nodes{\n        kpi\n        range\n        usd\n      }\n    }\n}", "variables": {} };
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

function CreateChart() {
    const receivedData = {
        "data": {
            "daoRevenues": {
                "nodes": [{ "kpi": "monthly", "range": "2019-12", "usd": 10280.22 }, { "kpi": "monthly", "range": "2020-01", "usd": 31.27 }, { "kpi": "monthly", "range": "2020-02", "usd": 28171.36 }, { "kpi": "monthly", "range": "2020-03", "usd": 55686.5 }, { "kpi": "monthly", "range": "2020-04", "usd": 1893.77 }, { "kpi": "monthly", "range": "2020-05", "usd": 268.9 }, { "kpi": "monthly", "range": "2020-06", "usd": 28510.73 }, { "kpi": "monthly", "range": "2020-07", "usd": 3372.85 }, { "kpi": "monthly", "range": "2020-08", "usd": 32419.41 }, { "kpi": "monthly", "range": "2020-09", "usd": 29722.67 }, { "kpi": "monthly", "range": "2020-10", "usd": 3292.41 }, { "kpi": "monthly", "range": "2020-11", "usd": 68895.01 }, { "kpi": "monthly", "range": "2020-12", "usd": 47113.37 }, { "kpi": "monthly", "range": "2021-01", "usd": 2610.76 }, { "kpi": "monthly", "range": "2021-02", "usd": 291775.11 }, { "kpi": "monthly", "range": "2021-03", "usd": 24459.32 }, { "kpi": "monthly", "range": "2021-04", "usd": 810497.61 }, { "kpi": "monthly", "range": "2021-05", "usd": 197007.27 }, { "kpi": "monthly", "range": "2021-06", "usd": 115972.28 }, { "kpi": "monthly", "range": "2021-07", "usd": 677435.83 }, { "kpi": "monthly", "range": "2021-08", "usd": 605596.12 }, { "kpi": "monthly", "range": "2021-09", "usd": 1192984.16 }, { "kpi": "monthly", "range": "2021-10", "usd": 58935.65 }, { "kpi": "monthly", "range": "2021-11", "usd": 1492016.2 },
                { "kpi": "monthly", "range": "2021-12", "usd": 1953249.4 }, { "kpi": "monthly", "range": "2022-01", "usd": 1561527.92 }, { "kpi": "monthly", "range": "2022-02", "usd": 1879757.34 }, { "kpi": "monthly", "range": "2022-03", "usd": 577173.73 }, { "kpi": "monthly", "range": "2022-04", "usd": 668008.07 }, { "kpi": "monthly", "range": "2022-05", "usd": 65615.8 }, { "kpi": "monthly", "range": "2022-06", "usd": 61674.79 }, { "kpi": "monthly", "range": "2022-07", "usd": 94988.97 }, { "kpi": "monthly", "range": "2022-08", "usd": 66573.34 }, { "kpi": "monthly", "range": "2022-09", "usd": 34681.3 }, { "kpi": "monthly", "range": "2022-10", "usd": 21038.65 }, { "kpi": "monthly", "range": "2022-11", "usd": 116470.6 }, { "kpi": "monthly", "range": "2022-12", "usd": 196703.7 }, { "kpi": "monthly", "range": "2023-01", "usd": 14393.18 }, { "kpi": "monthly", "range": "2023-02", "usd": 102970.7 }, { "kpi": "monthly", "range": "2023-03", "usd": 39145.08 }, { "kpi": "monthly", "range": "2023-04", "usd": 28798.58 }, { "kpi": "monthly", "range": "2023-05", "usd": 39111.39 }, { "kpi": "monthly", "range": "2023-06", "usd": 74970.34 }, { "kpi": "monthly", "range": "2023-07", "usd": 89284.36 }, { "kpi": "monthly", "range": "2023-08", "usd": 33360.27 }, { "kpi": "monthly", "range": "2023-09", "usd": 36709.39 }, { "kpi": "monthly", "range": "2023-10", "usd": 19746.51 }, { "kpi": "monthly", "range": "2023-11", "usd": 3365.17 }]
            }
        }
    };
    const JsonData = JSON.parse(JSON.stringify(receivedData));
    const nodes = JsonData.data.daoRevenues.nodes;

    const years = nodes.map(node => node.range); //["2019", "2020", "2021", "2022", "2023"],
    const revenues = nodes.map(node => node.usd); //[10280, 299378, 7422539, 5344214, 481854]

    var ctx = document.getElementById('monthlyRevenuesChart');
    var parent = ctx.parentElement;
    parent.style.height = "100%";
    parent.style.width = "100%";
    
    var monthlyRevenuesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Monthly Revenues',
                data: revenues,
                backgroundColor: ["red"],
            }]
        }
    });

    console.log("MonthlyDone");
}

CreateChart();