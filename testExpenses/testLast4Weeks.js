function CreateChart() {
    const firstWeek = 38;
    let grantExpenses = [0, 0, 1446666, 0, 0, 1860000, 0, 0, 1480000, 0, 0, 0];
    let rewardExpenses = [0, 0, 600000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let tokenExpenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let stakingExpenses = [0, 0, 400000, 0, 0, 120000, 0, 0, 2520000, 0, 0, 0];
    let otherExpenses = [0, 0, 588987, 0, 0, 20000, 0, 0, 0, 0, 0, 0];
    let intercoExpenses = [0, 0, 796053, 0, 0, 0, 266442, 0, 0, 0, 0, 0];
    let sandToUsd = [0.3, 0.3, 0.3, 0.29, 0.29, 0.33, 0.36, 0.41, 0.43, 0.4, 0.42, 0.44];

    const numberOfWeeks = 4;
    const sizeofArray = grantExpenses.length;
    console.log("Last " + numberOfWeeks + " weeks");

    if (grantExpenses.length != sizeofArray
        || rewardExpenses.length != sizeofArray
        || tokenExpenses.length != sizeofArray
        || stakingExpenses.length != sizeofArray
        || otherExpenses.length != sizeofArray
        || intercoExpenses.length != sizeofArray) {
        console.log("Error: Expenses arrays are not the same length");
        return;
    }

    //update the expenses arrays to only include the last 4 weeks
    grantExpenses = grantExpenses.slice(sizeofArray - numberOfWeeks, sizeofArray);
    rewardExpenses = rewardExpenses.slice(sizeofArray - numberOfWeeks, sizeofArray);
    tokenExpenses = tokenExpenses.slice(sizeofArray - numberOfWeeks, sizeofArray);
    stakingExpenses = stakingExpenses.slice(sizeofArray - numberOfWeeks, sizeofArray);
    otherExpenses = otherExpenses.slice(sizeofArray - numberOfWeeks, sizeofArray);
    intercoExpenses = intercoExpenses.slice(sizeofArray - numberOfWeeks, sizeofArray);
    sandToUsd = sandToUsd.slice(sizeofArray - numberOfWeeks, sizeofArray);

    document.getElementById("LastXWeeks").innerText = "Last " + numberOfWeeks + " weeks";

    const labels = [];
    for (let i = 0; i < numberOfWeeks; i++) {
        //push the last 4 week numbers
        labels.push("Week " + (i + firstWeek + sizeofArray - numberOfWeeks));
    }

    const GrantsBackgroundColors = [];
    const RewardBackgroundColors = [];
    const TokenBackgroundColors = [];
    const StakingBackgroundColors = [];
    const OtherBackgroundColors = [];
    const IntercoBackgroundColors = [];

    for (let i = 0; i < numberOfWeeks; i++) {
        GrantsBackgroundColors.push("#00AAEF");
        RewardBackgroundColors.push("#33BBF2");
        TokenBackgroundColors.push("#66CCF5");
        StakingBackgroundColors.push("#99DDF9");
        OtherBackgroundColors.push("#CCEEFC");
        IntercoBackgroundColors.push("#FFFFFF");
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
              },
              color: 'white', // Set the color of the tick values to white
            }
          },
          x: {
              color: 'white', // Set the color of the tick values to white
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

    console.log("WeeklyExpensesDone");
}

CreateChart();