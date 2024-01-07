<!-- Yearly Revenues -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.js"></script>
<canvas id="LastWeeksExpensesChart"></canvas>
<script>
function CreateChart() {
    const firstWeek = 38;
    const grantExpenses = [0, 0, 1446666, 0, 0, 1860000, 0, 0, 1480000, 0, 0, 0];
    const rewardExpenses = [0, 0, 600000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const tokenExpenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const stakingExpenses = [0, 0, 400000, 0, 0, 120000, 0, 0, 2520000, 0, 0, 0];
    const otherExpenses = [0, 0, 588987, 0, 0, 20000, 0, 0, 0, 0, 0, 0];
    const sandToUsd = [0.3, 0.3, 0.3, 0.29, 0.29, 0.33, 0.36, 0.41, 0.43, 0.4, 0.42, 0.44];

    const numberOfWeeks = sandToUsd.length;
    console.log("Last " + numberOfWeeks + " weeks");

    document.getElementById("LastXWeeks").innerText = "Last " + numberOfWeeks + " weeks";

    if (grantExpenses.length != numberOfWeeks
        || rewardExpenses.length != numberOfWeeks
        || tokenExpenses.length != numberOfWeeks
        || stakingExpenses.length != numberOfWeeks
        || otherExpenses.length != numberOfWeeks) {
        console.log("Error: Expenses arrays are not the same length");
        return;
    }

    const labels = [];
    for (let i = 0; i < numberOfWeeks; i++) {
        labels.push("Week " + (i + firstWeek));
    }

    const GrantsBackgroundColors = [];
    const RewardBackgroundColors = [];
    const TokenBackgroundColors = [];
    const StakingBackgroundColors = [];
    const OtherBackgroundColors = [];

    for (let i = 0; i < numberOfWeeks; i++) {
        GrantsBackgroundColors.push("#00AAEF");
        RewardBackgroundColors.push("#33BBF2");
        TokenBackgroundColors.push("#66CCF5");
        StakingBackgroundColors.push("#99DDF9");
        OtherBackgroundColors.push("#CCEEFC");
    }

    var ctx = document.getElementById('LastWeeksExpensesChart');
    var parent = document.getElementById('canvas-expenses');
    ctx.style.height = parent.style.height;
    ctx.style.width = parent.style.width;

    var options = {
        scales: {
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return value / 1000 + 'k';
              }
            }
          }
        }
      };

    var LastWeeksExpensesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Grants",
                    data: grantExpenses,
                    backgroundColor: GrantsBackgroundColors,
                    stack: 'Stack 0',
                },
                {
                    label: "Reward",
                    data: rewardExpenses,
                    backgroundColor: RewardBackgroundColors,
                    stack: 'Stack 0',
                },
                {
                    label: "Token/NFTs",
                    data: tokenExpenses,
                    backgroundColor: TokenBackgroundColors,
                    stack: 'Stack 0',
                },
                {
                    label: "Stacking",
                    data: stakingExpenses,
                    backgroundColor: StakingBackgroundColors,
                    stack: 'Stack 0',
                },
                {
                    label: "Others",
                    data: otherExpenses,
                    backgroundColor: OtherBackgroundColors,
                    stack: 'Stack 0',
                },
            ]
        },
        options: options
    });

    console.log("WeeklyExpensesDone");
}

CreateChart();
</script>