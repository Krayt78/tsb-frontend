function CreateChart() {
    const monthLabels = ["Sep 24", "Oct 24", "Nov 24", "Dec 24", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    let grantExpenses = [0, 3306666, 1480000, 0];
    let rewardExpenses = [0, 600000, 0, 0];
    let tokenExpenses = [0, 0, 0, 0];
    let stakingExpenses = [0, 520000, 2520000, 0];
    let intercoExpenses = [0, 1062494, 0, 0];
    let otherExpenses = [0, 608987, 0, 0];

    const numberOfMonths = 4;
    console.log("Last " + numberOfMonths + " months");
    const sizeofArray = grantExpenses.length;

    document.getElementById("LastXMonths").innerText = "Last " + numberOfMonths + " months";

    if (grantExpenses.length != sizeofArray
        || rewardExpenses.length != sizeofArray
        || tokenExpenses.length != sizeofArray
        || stakingExpenses.length != sizeofArray
        || otherExpenses.length != sizeofArray
        || intercoExpenses.length != sizeofArray) {
        console.log("Error: Expenses arrays are not the same length");
        return;
    }

    //update the expenses arrays to only include the last 4 months
    grantExpenses = grantExpenses.slice(sizeofArray - numberOfMonths, sizeofArray);
    rewardExpenses = rewardExpenses.slice(sizeofArray - numberOfMonths, sizeofArray);
    tokenExpenses = tokenExpenses.slice(sizeofArray - numberOfMonths, sizeofArray);
    stakingExpenses = stakingExpenses.slice(sizeofArray - numberOfMonths, sizeofArray);
    otherExpenses = otherExpenses.slice(sizeofArray - numberOfMonths, sizeofArray);
    intercoExpenses = intercoExpenses.slice(sizeofArray - numberOfMonths, sizeofArray);

    const labels = [];
    for (let i = 0; i < numberOfMonths; i++) {
       //push the last 4 months numbers
         labels.push(monthLabels[i + sizeofArray - numberOfMonths]);
    }

    const GrantsBackgroundColors = [];
    const RewardBackgroundColors = [];
    const TokenBackgroundColors = [];
    const StakingBackgroundColors = [];
    const OtherBackgroundColors = [];
    const IntercoBackgroundColors = [];

    for (let i = 0; i < numberOfMonths; i++) {
        GrantsBackgroundColors.push("#00AAEF");
        RewardBackgroundColors.push("#33BBF2");
        TokenBackgroundColors.push("#66CCF5");
        StakingBackgroundColors.push("#99DDF9");
        OtherBackgroundColors.push("#CCEEFC");
        IntercoBackgroundColors.push("#FFFFFF");
    }

    var ctx = document.getElementById('LastMonthsExpensesChart');
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
              },
              color: 'white' // Set the color of the tick values to white
            }
          },
          x: {
                title: {
                    display: true,
                    color: 'white', // Set the color of the x-axis label to white
                },
            }
        },
        plugins: {
            legend: {
              labels: {
                color: 'white' // Set the color of the legend labels to white
              }
            }
        }
    };

    var LastMonthsExpensesChart = new Chart(ctx, {
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
                    label: "Interco",
                    data: intercoExpenses,
                    backgroundColor: IntercoBackgroundColors,
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

    console.log("Last " + numberOfMonths + " MonthsExpensesDone");
}


CreateChart();