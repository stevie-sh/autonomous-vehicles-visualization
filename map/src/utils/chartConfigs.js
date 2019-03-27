/* Format chart for timeseries */
const timeSeriesOptions = {
  legend: {
    display: false
  },
  scales : {
    xAxes: [{
      type: 'time',
      time : {
        unit: 'minute',
      }
    }],
    yAxes: [{
      ticks :{
        beginAtZero: true
      }
    }]
  },
}
/* Make the bar chart a histogram */
const histogramOptions = {
  legend: {
    display: false
  },
  scales: {
    xAxes : [{
      categoryPercentage: 1.0,
      barPercentage: 1.0,
      display: true
    }
    ],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};


export {histogramOptions, timeSeriesOptions};
