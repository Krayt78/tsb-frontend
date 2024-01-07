function CreateChart() {
    const labels = ["Week 44", "Week 45", "Week 46", "Week 47", "Week 48"];
    const grantExpenses = [10, 29, 39, 53, 48];
    const rewardExpenses = [10, 29, 39, 53, 48];
    const tokenExpenses = [10, 29, 39, 53, 48];
    const stakingExpenses = [10, 29, 39, 53, 48];
    const otherExpenses = [10, 29, 39, 53, 48];

    var ctx = document.getElementById('AllExpensesChart');
    var parent = ctx.parentElement;
    parent.style.height = "100%";
    parent.style.width = "100%";
    
    var LastWeeksExpensesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Grant Expenses",
                    data: grantExpenses,
                    backgroundColor: ["red", "red", "red", "red", "red"],
                    stack: 'Stack 0',
                },
                {
                    label: "Reward Expenses",
                    data: rewardExpenses,
                    backgroundColor: ["blue", "blue", "blue", "blue", "blue"],
                    stack: 'Stack 0',
                },
                {
                    label: "Token Expenses",
                    data: tokenExpenses,
                    backgroundColor: ["green", "green", "green", "green", "green"],
                    stack: 'Stack 0',
                },
                {
                    label: "Stacking Expenses",
                    data: stakingExpenses,
                    backgroundColor: ["yellow", "yellow", "yellow", "yellow", "yellow"],
                    stack: 'Stack 0',
                },
                {
                    label: "Other Expenses",
                    data: otherExpenses,
                    backgroundColor: ["orange", "orange", "orange", "orange", "orange"],
                    stack: 'Stack 0',
                },
            ]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });

    console.log("AllExpensesDone");
}

CreateChart();