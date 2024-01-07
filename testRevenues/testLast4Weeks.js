function CreateChart() {
    const firstWeek = 38;
    let revenues = [15887, 0, 31328, 38822, 16205, 8344, 17052, 2690, 2645, 213783, 124740, 6373];

    const numberOfWeeks = 4;
    const sizeofArray = revenues.length;
    console.log("Last " + numberOfWeeks + " weeks");

    //update the expenses arrays to only include the last 4 weeks
    revenues = revenues.slice(sizeofArray - numberOfWeeks, sizeofArray);

    const labels = [];
    for (let i = 0; i < numberOfWeeks; i++) {
        //push the last 4 week numbers
        labels.push("Week " + (i + firstWeek + sizeofArray - numberOfWeeks));
    }

    const revenuesBackgroundColors = [];

    for (let i = 0; i < numberOfWeeks; i++) {
        revenuesBackgroundColors.push("#00AAEF");
    }

    var ctx = document.getElementById('Last4WeeksRevenuesChart');
    var parent = document.getElementById('canvas-revenue');
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

    var LastWeeksRevenuesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Revenues",
                    data: revenues,
                    backgroundColor: revenuesBackgroundColors,
                    stack: 'Stack 0',
                },
            ]
        },
        options: options
    });

    console.log("WeeklyRevenuesDone");
}

CreateChart();